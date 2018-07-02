const Queue = require('promise-queue');

class Utils {
  newQueue() {
    return new Queue(1, Infinity);
  }
}

module.exports = Utils;
