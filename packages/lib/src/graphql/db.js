// @flow

const admin = require('firebase-admin');

admin.initializeApp();

const getRef = location => `/${location.join('/')}`;

const db = {
  update: (location, values) => admin
    .database()
    .ref(getRef(location))
    .update(values)
    .then(() => db.get(location)),
  set: (location, value) =>
    admin
      .database()
      .ref(getRef(location))
      .set(value)
      .then(() => db.get(location)),
  get: location =>
    admin
      .database()
      .ref(getRef(location))
      .once('value')
      .then(snapshot => snapshot.val()),
  delete: location =>
    admin
      .database()
      .ref(getRef(location))
      .remove(),
};

module.exports = db;
