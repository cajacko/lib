// @flow
/* eslint max-lines: 0 */

import { join } from 'path';
import { ensureDir, copy } from 'fs-extra';
import {
  runCommand,
  copyTmpl,
  copyDependencies,
} from '@cajacko/template-utils';
import Template from '../modules/Template';
import {
  registerLibOutDir,
  setOutDirIsReady,
  unregisterLibOutDir,
} from '../utils/libOutDirs';
import copyAndWatch, { copy as UCopy } from '../utils/copyAndWatch';

/**
 * Run the graphQL template
 */
class GraphQL extends Template {
  /**
   * Initialise the class and define any helper props
   *
   * @param  {...any} args The args to pass up to the parent class
   *
   * @return {Void} No return value
   */
  constructor(...args) {
    super(...args);

    this.tmplDir = join(this.filesDir, 'graphql');
    this.tmplSrcDir = join(this.tmplDir, 'src');
    this.tmpFuncDir = join(this.tmpDir, 'functions');
    this.libOutDir = join(this.tmpFuncDir, 'node_modules/@cajacko/lib');
    this.nvmVersion = 'v6.14.0';
  }

  /**
   * When the class initialises decide whether to register the lib out dir
   *
   * @return {Promise} Promise that resolves when we've figured it out
   */
  init() {
    this.runIfUseLocal(() =>
      registerLibOutDir(this.libOutDir, this.shouldWatch));
  }

  /**
   * Install the dependencies and then indicate the out dir is ready for
   * watching
   */
  installAndSetOutDir() {
    const opts = {
      withNVM: this.command === 'start' ? this.nvmVersion : null,
      ignoreEngines: true,
    };

    return this.installDependencies(null, opts).then(() =>
      this.runIfUseLocal(() => setOutDirIsReady(this.libOutDir)));
  }

  /**
   * Copy the src file to tmp and watch if required
   *
   * @return {Promise} Promise that resolves when the copy has finished
   */
  copyOrWatchSrc() {
    const tmpSrc = join(this.tmpFuncDir, 'src');

    if (this.shouldWatch) {
      return copyAndWatch(this.projectSrcDir, tmpSrc, {
        transpile: true,
        exitOnError: true,
      });
    }

    return UCopy(this.projectSrcDir, tmpSrc, { transpile: true });
  }

  /**
   * Deploy the graphql api
   */
  deploy() {
    return this.prepareApp().then(() =>
      runCommand(
        `yarn run firebase deploy --only functions --token ${
          this.env.FIREBASE_TOKEN
        }`,
        this.tmpDir
      ));
  }

  /**
   * Prep the graphql dir
   */
  prepareApp() {
    if (this.commander.skipPrepare) return Promise.resolve();

    const whitelist = [
      '@cajacko/lib',
      'firebase-functions',
      'express',
      'apollo-server-express',
      'firebase-admin',
      'graphql',
    ];

    return Promise.all([
      this.getActiveLibDir(),
      ensureDir(this.tmpDir)
        .then(() => copy(this.tmplSrcDir, this.tmpDir))
        .then(() =>
          copyDependencies(this.projectDir, this.tmpFuncDir, {
            whitelist,
          })),
    ])
      .then(([localLibPath]) =>
        copyDependencies(localLibPath, this.tmpFuncDir, {
          whitelist,
        }))
      .then(() =>
        Promise.all([
          this.installAndSetOutDir(),
          this.copyOrWatchSrc(),
          copyTmpl(
            join(this.tmplDir, 'config.js'),
            join(this.tmpFuncDir, 'config.js'),
            this.templateConfig
          ),
          copyTmpl(
            join(this.tmplSrcDir, '.firebaserc'),
            join(this.tmpDir, '.firebaserc'),
            { firebaseProjectID: this.env.FIREBASE_PROJECT_ID }
          ),
        ]));
  }

  /**
   * Start the graphQL template
   *
   * @return {Promise} Promise that resolves when the template has been built
   */
  start() {
    return this.prepareApp().then(() => {
      let needToAuthenticate = false;

      const start = (opts = {}) =>
        runCommand('yarn start', this.tmpDir, {
          withNVM: this.nvmVersion,
          ...opts,
        });

      return start({
        onData: (message) => {
          if (needToAuthenticate) return;

          needToAuthenticate = String(message).includes('Command requires authentication');
        },
      }).catch((e) => {
        if (!needToAuthenticate) throw e;

        logger.log('You need to login to firebase. Follow the prompts to login.');
        return runCommand('npx firebase login', this.tmpDir, {
          withNVM: this.nvmVersion,
        }).then(() => start());
      });
    });
  }

  /**
   * When finished unregister the lib out dir
   *
   * @return {Void} No return value
   */
  onFinish() {
    this.runIfUseLocal(() => unregisterLibOutDir(this.libOutDir));
  }
}

export default GraphQL;
