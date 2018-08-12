// @flow

import errors from '../config/errors';

class AppError extends Error {
  constructor(devMessage, error) {
    const actualError = error || errors[3];

    const code = actualError && actualError.code;

    const message = code
      ? `Code: ${code}; ${devMessage}`
      : `No Error Code: ${devMessage}`;

    super(message);
  }
}

export default AppError;
