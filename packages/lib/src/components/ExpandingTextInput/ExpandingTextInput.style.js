// @flow

import styled from 'styled-components';
import { Div, Span, TextInput as UITextInput } from '../UI';
import textIconColor from '../../utils/textIconColor';
import getInputStyles from '../../utils/getInputStyles';

// Don't set padding here, as the padding get's removed if editable is
// false on the TextInput

const getFontSize = ({ type }) => getInputStyles(type).size;

export const Container = styled(Div)``;

// The + 50 buffer, ensures the text input doesn't go into it's scroll view
// mode by accident when you do quick line breaks
export const TextInput = styled(UITextInput)`
  font-size: ${getFontSize};
  height: ${({ inputHeight }) => inputHeight + 50};
  color: ${({ textBackgroundColor }) =>
    textIconColor({ backgroundColor: textBackgroundColor })};
  text-align-vertical: top;
`;

export const Text = styled(Span)`
  position: absolute;
  top: 10000;
  left: 10000;
  background-color: transparent;
  border-color: transparent;
  color: transparent;
  font-size: ${getFontSize};
  width: ${({ hiddenWidth }) => hiddenWidth};
`;
