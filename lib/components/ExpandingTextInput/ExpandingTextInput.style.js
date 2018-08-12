// @flow

import styled from 'styled-components';
import { Div, Span, TextInput as UITextInput } from '../UI';
import { INPUT_STYLES, COLORS } from '../../config/styles/text';

// Don't set padding here, as the padding get's removed if editable is
// false on the TextInput

const fontSize = INPUT_STYLES.size;

export const Container = styled(Div)``;

// The + 50 buffer, ensures the text input doesn't go into it's scroll view
// mode by accident when you do quick line breaks
export const TextInput = styled(UITextInput)`
  font-size: ${fontSize};
  height: ${({ inputHeight }) => inputHeight + 50};
  color: ${COLORS.BLACK};
`;

export const Text = styled(Span)`
  position: absolute;
  top: 10000;
  left: 10000;
  background-color: transparent;
  border-color: transparent;
  color: transparent;
  font-size: ${fontSize};
  width: ${({ hiddenWidth }) => hiddenWidth};
`;
