// @flow

import merge from 'lodash/merge';
import get from 'lodash/get';
import AppError from './AppError';

class MarketingCopy {
  constructor(copy) {
    this.copy = copy;
  }

  set(copy, replace) {
    if (replace) this.copy = {};

    this.copy = merge(this.copy, copy);
  }

  get(id) {
    const text = get(this.copy, id);

    if (text) return text;

    throw new AppError(`Could not find any text at the id: ${id}`);
  }

  getAll() {
    return this.copy;
  }
}

export default MarketingCopy;
