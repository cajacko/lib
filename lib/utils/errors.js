// @flow

import Errors from '../modules/Errors';
import defaultErrors from '../config/errors';

const errors = new Errors(defaultErrors, defaultErrors['1']);

export default errors;
