// @flow

import objHasVal from './conditionals/objHasVal';
import AppError from '../modules/AppError';

const ensureObjHasVal = (obj, val, err) => {
  if (!objHasVal(obj, val)) {
    if (err) throw err;

    throw new AppError('ensureObjHasVal throw an error. The supplied object does not have the given value');
  }

  return val;
};

export default ensureObjHasVal;
