// @flow

import styled from 'styled-components';
import { TextInput as UITextInput } from '../../UI';
import { INPUT_STYLES } from '../../../config/styles/text';
import textIconColor from '../../../utils/textIconColor';

// Don't set padding here, as the padding get's removed if editable is
// false on the TextInput

const fontSize = INPUT_STYLES.size;

// The + 50 buffer, ensures the text input doesn't go into it's scroll view
// mode by accident when you do quick line breaks
export const TextInput = styled(UITextInput)`
  font-size: ${fontSize};
  color: ${({ backgroundColor }) => textIconColor({ backgroundColor })};
  text-align-vertical: top;
  flex: 1;
`;
