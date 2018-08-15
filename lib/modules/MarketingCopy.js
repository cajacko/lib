// @flow

import merge from 'lodash/merge';
import get from 'lodash/get';

class MarketingCopy {
  constructor(copy) {
    this.copy = copy;

    // Can't use AppError here, as AppError imports all the errors, which relies on all the
    // marketing copy stuff being setup first.
    this.Error = Error;
  }

  setErrorClass(CustomError) {
    this.Error = CustomError;
  }

  set(copy, replace) {
    if (replace) this.copy = {};

    this.copy = merge(this.copy, copy);
  }

  get(id) {
    const text = get(this.copy, id);

    if (text) return text;

    const CustomError = this.Error;

    throw new CustomError(`Could not find any text at the id: ${id}`);
  }

  getAll() {
    return this.copy;
  }
}

export default MarketingCopy;
