// @flow

import Errors from '../modules/Errors';
import defaultErrors from '../config/errors';

const errors = new Errors(defaultErrors, defaultErrors['1']);

errors.setErrorBoundaryError((error) => {
  try {
    const code = error.message.match(/Code: ([0-9]+)/)[1];

    return errors.getError(code);
  } catch (e) {
    return null;
  }
});

export default errors;
