const { spawn } = require('child_process');

// Spawn a new command, streaming the logs as they happen, returning a promise
module.exports = (command, cwd = process.cwd(), dataCallback) =>
  new Promise((resolve, reject) => {
    const commands = command.split(' ').filter(string => string !== '');

    const ls = spawn(commands.splice(0, 1)[0], commands, {
      cwd,
    });

    ls.stdout.on('data', (data) => {
      console.log(`${data}`);
      if (dataCallback) dataCallback(`${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.log(`${data}`);
      if (dataCallback) dataCallback(`${data}`);
    });

    ls.on('close', (code) => {
      if (code) {
        reject();
      } else {
        resolve(`Process exited with code ${code}`);
      }
    });
  });
