const admin = require('firebase-admin');

admin.initializeApp();

const getRef = location => `/${location.join('/')}`;

const db = {
  set: (location, value) =>
    admin
      .database()
      .ref(getRef(location))
      .set(value),
  get: location =>
    admin
      .database()
      .ref(getRef(location))
      .once('value')
      .then(snapshot => snapshot.val()),
};

module.exports = db;
