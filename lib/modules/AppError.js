// @flow

import errors from '../utils/errors';

class AppError extends Error {
  constructor(devMessage, error) {
    const actualError = error || errors.getError('100-003');

    const code = actualError && actualError.code;

    const message = code
      ? `Code: ${code}; ${devMessage}`
      : `No Error Code: ${devMessage}`;

    super(message);
  }
}

export default AppError;
