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
}

export default Errors;
