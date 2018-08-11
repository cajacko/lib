// @flow

import styled from 'styled-components';
import { Div, Span, TextInput as UITextInput } from '../UI';

const textPadding = 10;
const fontSize = 18;

export const Container = styled(Div)``;

// The + 50 buffer, ensures the text input doesn't go into it's scroll view
// mode by accident when you do quick line breaks
export const TextInput = styled(UITextInput)`
  padding-horizontal: ${textPadding};
  padding-vertical: ${textPadding};
  font-size: ${fontSize};
  height: ${({ inputHeight }) => inputHeight + 50};
`;

export const Text = styled(Span)`
  position: absolute;
  top: 10000;
  left: 10000;
  background-color: transparent;
  border-color: transparent;
  color: transparent;
  padding-horizontal: ${textPadding};
  padding-vertical: ${textPadding};
  font-size: ${fontSize};
  width: ${({ hiddenWidth }) => hiddenWidth};
`;
