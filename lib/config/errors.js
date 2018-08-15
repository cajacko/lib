// @flow

import marketingCopy from '../utils/marketingCopy';

const errors = {
  '100-001': {
    label: 'General Error',
    title: marketingCopy.get('Errors.General.Title'),
    message: marketingCopy.get('Errors.General.Message'),
  },
  '100-002': {
    label: '404',
    title: marketingCopy.get('Errors.404.Title'),
    message: marketingCopy.get('Errors.404.Message'),
  },
  '100-003': {
    label: 'Dev Error',
    title: marketingCopy.get('Errors.DevError.Title'),
    message: marketingCopy.get('Errors.DevError.Message'),
  },
};

export default errors;
