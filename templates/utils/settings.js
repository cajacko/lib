const settings = require('user-settings').file('.lib');

exports.set = settings.set;
exports.get = settings.get;
exports.unset = settings.unset;
