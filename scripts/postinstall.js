// @flow

const { join } = require('path');
const settings = require('../packages/template/dist/config/settings').default;

settings.set(join(__dirname, '../'), 'LOCAL_LIB_PATH');
