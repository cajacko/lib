// @flow

import DB from './DB';

class Api {
  init(...args) {
    this._db = new DB(...args);

    return this._db.ready().then(() => this._db);
  }

  ready() {
    if (this._db) return this._db.ready();

    return this.init().ready();
  }

  db() {
    if (this._db) return this._db;

    return this.init();
  }
}

export default Api;
