// @flow

class Errors {
  constructor(errors, defaultError, customGetErrorBoundaryError = null) {
    this.setErrors(errors, defaultError);
    this.customGetErrorBoundaryError = customGetErrorBoundaryError;
  }

  getErrorBoundaryError(error, info, props) {
    if (this.customGetErrorBoundaryError) {
      return this.customGetErrorBoundaryError(error, info, props);
    }

    return this.defaultError;
  }

  setErrors(errors, defaultError) {
    if (!errors || !defaultError) {
      throw new Error('Errors.setErrors(errors, defaultError) requires both an errors object and a default error.');
    }

    this.errors = errors;
    this.defaultError = defaultError;
  }

  setErrorBoundaryError(customGetErrorBoundaryError) {
    this.customGetErrorBoundaryError = customGetErrorBoundaryError;
  }

  getError(code) {
    if (!code) return this.defaultError;

    return this.errors[code] || this.defaultError;
  }
}

export default Errors;
