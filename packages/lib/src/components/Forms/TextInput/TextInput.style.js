// @flow

import styled from 'styled-components';
import { TextInput as UITextInput } from '../../UI';
import { STANDARD_SPACING } from '../../../config/styles/spacing';
import { INPUT_STYLES } from '../../../config/styles/text';
import { BUTTON_BORDER_RADIUS } from '../../../config/styles/buttons';
import { GREY } from '../../../config/styles/colors';
import textIconColor from '../../../utils/textIconColor';
import { COLORS_FOR_BACKGROUND } from '../../../config/styles/textIconColors';

// Don't set padding here, as the padding get's removed if editable is
// false on the TextInput

const fontSize = INPUT_STYLES.size;
const height = fontSize + STANDARD_SPACING * 3;

/**
 * Get the border color, if there's an error then get the error
 * colour for the background
 */
const borderColor = ({ error, backgroundColor }) => {
  const errorColor = COLORS_FOR_BACKGROUND[backgroundColor].error;

  if (error && errorColor) {
    return errorColor;
  }

  return GREY;
};

// The + 50 buffer, ensures the text input doesn't go into it's scroll view
// mode by accident when you do quick line breaks
export const TextInput = styled(UITextInput)`
  font-size: ${fontSize};
  color: ${({ backgroundColor }) => textIconColor({ backgroundColor })};
  text-align-vertical: top;
  width: 100%;
  border-radius: ${BUTTON_BORDER_RADIUS};
  height: ${height};
  padding-horizontal: ${STANDARD_SPACING};
  border-width: 1;
  border-color: ${borderColor};
`;
