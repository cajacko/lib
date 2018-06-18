// @flow

import merge from 'lodash/merge';

export default (...args) => {
  console.log('merging');
  merge(...args);
};
