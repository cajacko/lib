// @flow

import {
  COLORS,
  BACKGROUND_COLORS,
  COLORS_FOR_BACKGROUND,
} from '../config/styles/textIconColors';
import ensureObjHasVal from './ensureObjHasVal';
import AppError from '../modules/AppError';

const textIconColor = ({
  backgroundColor,
  _dangerouslySetColor,
  highlight,
}) => {
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
    } else if (finalTextColor.default) {
      finalTextColor = finalTextColor.default;
    } else {
      throw new AppError(`No default color for background color: ${finalBackgroundColor}`);
    }
  }

  return ensureObjHasVal(
    COLORS,
    finalTextColor,
    new AppError(`Text/icon is not allowed to have the color ${String(finalTextColor)}${finalBackgroundColor &&
        `. With background color ${finalBackgroundColor}`}`)
  );
};

export default textIconColor;
