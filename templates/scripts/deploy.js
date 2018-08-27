const program = require('commander');
const { writeJSON } = require('fs-extra');
const { join } = require('path');
const ensureProjectSelected = require('../utils/ensureProjectSelected');
const build = require('../utils/build');
const getBuildDir = require('../utils/getBuildDir');

const firebaseJSONdefaults = {
  public: 'dist',
  headers: [
    {
      source: 'static/**/*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'max-age=31536000',
        },
      ],
    },
  ],
  rewrites: [
    {
      source: '**',
      destination: '/index.html',
    },
  ],
};

const getFirebasJSON = (firebaseJSON) => {
  const json = Object.assign({}, firebaseJSONdefaults);

  if (!firebaseJSON) return json;

  if (firebaseJSON.headers) {
    json.headers = json.headers.concat(firebaseJSON.headers);
  }

  if (firebaseJSON.rewrites) {
    json.rewrites = json.rewrites.concat(firebaseJSON.rewrites);
  }

  return json;
};

program.command('deploy [package]').action(temlplateArg =>
  ensureProjectSelected(temlplateArg).then((data) => {
    if (!data.firebaserc) {
      throw new Error('No firebaserc found in the  project config');
    }

    return build(data)
      .then(() => getBuildDir(data.key))
      .then(dir =>
        Promise.all([
          writeJSON(join(dir, 'firebase.json'), data.firebaserc, { spaces: 2 }),
          writeJSON(
            join(dir, '.firebaserc'),
            getFirebasJSON(data.firebaseJSON),
            { spaces: 2 },
          ),
        ]));
  }));
