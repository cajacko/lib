// @flow

import React from 'react';
import TextInput from '../../../Forms/TextInput';
import type { TextValue } from '../../../Text/Text.render';
import type { BackgroundColor } from '../../../../config/styles/textIconColors';

type Props = {
  text: TextValue,
  numberOfLines?: number,
  backgroundColor: BackgroundColor,
  greyedOut?: boolean,
};

const defaultProps = {
  numberOfLines: 2,
  greyedOut: false,
};

/**
 * Display a text card
 */
const WithTextInput = (props: Props) => <TextInput {...props} />;

WithTextInput.defaultProps = defaultProps;

export default WithTextInput;
