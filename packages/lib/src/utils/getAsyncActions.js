// @flow

/**
 * Get the names for an async redux action
 */
const getAsyncActions = (action: string) => {
  /**
   * Get the name to append to the object
   */
  const append = type => ({ [type]: `${action}_${type}` });

  return {
    ...append('REQUESTED'),
    ...append('SUCCEEDED'),
    ...append('FAILED'),
  };
};

export default getAsyncActions;
