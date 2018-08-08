// @flow

class Subscription {
  constructor(initialValues, preset = null, setMethod = null) {
    this.values = initialValues;
    this.subscriptions = [];

    if (preset && this[preset]) {
      this.setMethod = this[preset];
    } else {
      this.setMethod = setMethod;
    }
  }

  subscribe(cb) {
    this.subscriptions.push(cb);
  }

  unsubscribe(cb) {
    this.subscriptions = this.subscriptions.filter(subscription => subscription === cb);
  }

  object(prevValues, key, value, all) {
    if (all) return all;

    const val = Object.assign({}, prevValues);
    val[key] = value;
    return val;
  }

  get() {
    return this.values;
  }

  set(...args) {
    const set = () => {
      if (!this.setMethod) return Promise.resolve();

      return Promise.resolve(this.setMethod(this.values, ...args));
    };

    return set().then((newVals) => {
      this.values = newVals;

      this.subscriptions.forEach((subscription) => {
        subscription(this.values);
      });
    });
  }

  setSetMethod(set) {
    this.setMethod = set;
  }
}

export default Subscription;
