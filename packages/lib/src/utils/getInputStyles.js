// @flow

import { INPUT_TYPES } from '../config/styles/text';

/**
 * Get the input styles based off the given type
 */
const getInputStyles = type => (type && INPUT_TYPES[type]) || INPUT_TYPES.body1;

export default getInputStyles;
