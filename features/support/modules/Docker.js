/* eslint require-jsdoc: 0 */
const hash = require('object-hash');
const { runCommand } = require('../../../packages/template-utils/lib/main');

class Docker {
  constructor(id) {
    this.id = id;
    this.containerName = `cajacko-lib-${id}`;
    this.history = [];
    this.baseImage = 'node:latest';
    this.image = this.baseImage;
    this.restartNeeded = false;
    this.preventCommits = false;
    this.workdir = null;
    this.imageRepo = 'cajacko/cajacko-lib';

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.cd = this.cd.bind(this);
    this.cp = this.cp.bind(this);
    this.run = this.run.bind(this);
    this.cleanImages = this.cleanImages.bind(this);
  }

  start() {
    return runCommand(
      `docker run -t -d --name=${this.containerName} ${this.image} /bin/bash`,
      { noLog: true }
    );
  }

  stop() {
    return runCommand(`docker stop ${this.containerName}`, {
      noLog: true,
      logError: false,
    })
      .then(() =>
        runCommand(`docker rm ${this.containerName}`, {
          noLog: true,
          logError: false,
        }))
      .catch(() => null);
  }

  cleanImages() {
    return runCommand(
      `docker rmi --force $(docker images | grep '${this.imageRepo}')`,
      {
        withExec: true,
      }
    ).catch(() => null);
  }

  cd(path, opts = {}) {
    this.workdir = path;

    const finalOpts = Object.assign(
      {
        commit: true,
        commitArgs: '-c cdVar',
        vars: {
          cdVar: `WORKDIR ${path}`,
        },
      },
      opts
    );

    return this._runCommands('WORKDIR', finalOpts, { value: path });
  }

  cp(srcPath, destPath, opts) {
    return this._runCommands('COPY', opts, {
      value: `${srcPath} ${destPath}`,
      callback: () =>
        runCommand(`docker cp ${srcPath} ${this.containerName}:/${destPath}`),
    });
  }

  run(...args) {
    let commands = args.slice();
    let opts = args[args.length - 1];

    if (typeof opts === 'object') {
      commands.pop();
    } else {
      opts = {};
    }

    commands = commands.map((command) => {
      let dockerCommand = command;
      let commandToRun = command;

      if (this.workdir) {
        dockerCommand = `cd ${this.workdir} && ${command}`;
        commandToRun = 'bash -c activeDirCommand';
      }

      const callback = () =>
        runCommand(`docker exec -it ${this.containerName} ${commandToRun}`, {
          vars: {
            activeDirCommand: dockerCommand,
          },
        });

      return {
        value: dockerCommand,
        callback,
      };
    });

    return this._runCommands('RUN', opts, ...commands);
  }

  _addToHistory(command, value) {
    this.history.push({
      command,
      value,
    });
  }

  _getHistoryHash() {
    return hash(this.history);
  }

  _getImageNameFromHash(historyHash) {
    return `${this.imageRepo}:${historyHash}`;
  }

  _getImageFromHash(historyHash) {
    const imageName = this._getImageNameFromHash(historyHash);

    let imageExists = false;

    return runCommand(`docker images -q ${imageName}`, {
      onData: () => {
        imageExists = true;
      },
    }).then(() => (imageExists ? imageName : null));
  }

  _restart() {
    this.restartNeeded = false;

    return this.stop().then(this.start);
  }

  _shouldCommit(opts) {
    if (this.preventCommits) return false;
    if (!opts || typeof opts !== 'object') return false;

    if (opts.preventCommits) {
      this.preventCommits = true;
      return false;
    }

    switch (opts.commit) {
      case true:
        return true;
      case false:
        return false;
      default:
        // Change here to commit by default or not
        return true;
    }
  }

  _commit(historyHash, opts) {
    const newImageName = this._getImageNameFromHash(historyHash);
    let command = 'docker commit';

    if (opts && opts.commitArgs) {
      command = `${command} ${opts.commitArgs}`;
    }

    command = `${command} ${this.containerName} ${newImageName}`;

    return runCommand(command, { vars: opts && opts.vars });
  }

  _runCommands(command, opts, ...args) {
    const callbacks = args.map(({ value, callback }) => {
      this._addToHistory(command, value);
      return callback;
    });

    const historyHash = this._getHistoryHash();

    return this._getImageFromHash(historyHash).then((image) => {
      if (image) {
        this.image = image;
        this.restartNeeded = true;

        return Promise.resolve();
      }

      const promise = this.restartNeeded ? this._restart() : Promise.resolve();

      return promise
        .then(() => {
          const loop = (i = 0) => {
            if (i > callbacks.length - 1) return Promise.resolve();

            const callback = callbacks[i];

            let callbackPromise = Promise.resolve();

            if (callback && typeof callback === 'function') {
              callbackPromise = callback();
            }

            return callbackPromise.then(() => loop(i + 1));
          };

          return loop();
        })
        .then(() => {
          if (this._shouldCommit(opts)) {
            return this._commit(historyHash, opts).catch(() => null);
          }

          return Promise.resolve();
        });
    });
  }
}

module.exports = Docker;
