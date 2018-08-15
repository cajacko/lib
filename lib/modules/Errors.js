// @flow

import AppError from './AppError';

class Errors {
  constructor(errors, defaultError, customGetErrorBoundaryError = null) {
    this.setErrors(errors, defaultError, true, true);
    this.customGetErrorBoundaryError = customGetErrorBoundaryError;
  }

  getErrorBoundaryError(error, info, props) {
    if (this.customGetErrorBoundaryError) {
      return (
        this.customGetErrorBoundaryError(error, info, props) ||
        this.defaultError
      );
    }

    return this.defaultError;
  }

  setErrors(errors, defaultError, replace, errorIfNotPassed) {
    if ((errorIfNotPassed || replace) && (!errors || !defaultError)) {
      throw new AppError('Errors.setErrors(errors, defaultError) requires both an errors object and a default error.');
    }

    if (defaultError) this.defaultError = this.mapError(defaultError);

    if (replace) {
      this.errors = {};
    }

    if (errors) {
      Object.keys(errors).forEach((code) => {
        this.errors[code] = this.mapError(code, errors[code]);
      });
    }
  }

  mapError(code, error) {
    return { code, ...error };
  }

  setErrorBoundaryError(customGetErrorBoundaryError) {
    this.customGetErrorBoundaryError = customGetErrorBoundaryError;
  }

  getError(code) {
    if (!code) return this.defaultError;

    return this.errors[code] || this.defaultError;
  }

  getErrors() {
    return this.errors;
  }
}

export default Errors;
