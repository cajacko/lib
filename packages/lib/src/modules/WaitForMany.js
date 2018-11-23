// @flow

import uuid from '../utils/uuid';

class WaitForMany {
  constructor() {
    this.registeredIDs = {};

    this.setPromise();

    this.ErrorClass = Error;
  }

  setErrorClass(CustomError) {
    this.ErrorClass = CustomError;
  }

  setPromise() {
    this.resolved = false;
    this.rejected = null;

    this.promise = new Promise((resolve, reject) => {
      this.check = () => {
        if (Object.keys(this.registeredIDs).length) return;

        resolve();
        this.resolved = true;
      };

      this.rejectMainPromise = (e) => {
        const { ErrorClass } = this;
        this.rejected =
          e || new ErrorClass('WaitForMany got rejected without an error');
        reject(this.rejected);
      };
    });
  }

  resolve(id) {
    delete this.registeredIDs[id];

    this.check();
  }

  reject(e) {
    this.rejectMainPromise(e);
  }

  setPromiseIfResolved() {
    if (this.resolved) this.setPromise();
  }

  register(id) {
    this.registeredIDs[id] = true;
    this.setPromiseIfResolved();
  }

  waitFor(promise, id) {
    const promiseID = id || uuid();

    this.registeredIDs[promiseID] = true;

    this.setPromiseIfResolved();

    promise
      .then(() => {
        this.resolve(id);
      })
      .catch(this.rejectMainPromise);
  }

  isRejected() {
    return this.rejected;
  }

  isResolved() {
    return this.resolved;
  }

  getPromise() {
    this.check();
    return this.promise;
  }
}

export default WaitForMany;
