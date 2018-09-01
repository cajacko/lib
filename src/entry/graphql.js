// @flow

const functions = require('firebase-functions');
const graphql = require('../graphql');

module.exports = config => functions.https.onRequest(graphql);
