// @flow

import { PRIMARY, GREY_LIGHTER } from './colors';
import { COLORS as iconColors } from './icons';
import { COLORS as textColors } from './text';

export const THEMES = {
  PRIMARY: {
    backgroundColor: PRIMARY,
    iconColorActive: iconColors.WHITE,
    iconColor: iconColors.BLACK,
    textColorActive: textColors.WHITE,
    textColor: textColors.BLACK,
  },
  LIGHT: {
    backgroundColor: GREY_LIGHTER,
    iconColorActive: iconColors.PRIMARY,
    iconColor: iconColors.BLACK,
    textColorActive: textColors.PRIMARY,
    textColor: textColors.BLACK,
  },
};
