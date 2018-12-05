// @flow

import React from 'react';
import { Text as StyledText, transformText } from './Text.style';
import withText from '../HOCs/withText';

// Legacy export, a bunch of places used to look here for this
// Use the one in the util instead
export type { TextValue } from '../../utils/getText';

type Props = {
  text: string,
  type?: string,
};

const defaultProps = {
  // Not defining the default here, as we do this in Text.style.js
  type: null,
};

/**
 * Display some text, whilst doing any transformations as necessary
 */
const Text = ({ text, ...props }: Props) => (
  <StyledText {...props}>{transformText(text, props)}</StyledText>
);

Text.defaultProps = defaultProps;

export default withText('text')(Text);
