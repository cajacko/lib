// @flow

import {
  COLORS,
  BACKGROUND_COLORS,
  COLORS_FOR_BACKGROUND,
} from '../config/styles/textIconColors';
import ensureObjHasVal from './ensureObjHasVal';
import AppError from '../modules/AppError';
import type { BackgroundColor, Color } from '../config/styles/textIconColors';

type Props = {
  backgroundColor?: BackgroundColor,
  _dangerouslySetColor?: Color,
  highlight?: boolean,
  greyedOut?: boolean,
};

/**
 * Get the text or icon color, based off the passed in props. When you think
 * about it deciding the colour of text or an icon, is based on what the
 * background colour is, and what state the text should be in; normal,
 * highlighted or greyed out. This func then makes it easy for us to change
 * brand colours and have high confidence the text contrast is as intended
 */
const textIconColor = ({
  backgroundColor,
  _dangerouslySetColor,
  highlight,
  greyedOut,
}: Props) => {
  let finalTextColor;
  let finalBackgroundColor;

  if (_dangerouslySetColor) {
    finalTextColor = _dangerouslySetColor;
  } else if (!backgroundColor) {
    throw new AppError('No color or background color was passed to textIconColor.js');
  } else {
    finalBackgroundColor = backgroundColor || BACKGROUND_COLORS.WHITE;
    finalTextColor = COLORS_FOR_BACKGROUND[finalBackgroundColor];

    if (!finalTextColor) {
      throw new AppError('Could not derive the color for this text/icon');
    } else if (highlight && finalTextColor.highlight) {
      finalTextColor = finalTextColor.highlight;
    } else if (greyedOut && finalTextColor.greyedOut) {
      finalTextColor = finalTextColor.greyedOut;
    } else if (finalTextColor.default) {
      finalTextColor = finalTextColor.default;
    } else {
      throw new AppError(`No default color for background color: ${finalBackgroundColor}`);
    }
  }

  return ensureObjHasVal(
    COLORS,
    finalTextColor,
    new AppError(`Text/icon is not allowed to have the color ${String(finalTextColor)}${
      finalBackgroundColor
        ? `. With background color ${String(finalBackgroundColor)}`
        : ''
    }`)
  );
};

export default textIconColor;
