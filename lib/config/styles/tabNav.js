// @flow

import { PRIMARY, PRIMARY_DARK, GREY_LIGHTER } from './colors';
import { COLORS as iconColors } from './icons';
import { COLORS as textColors } from './text';

export const THEMES = {
  PRIMARY: {
    backgroundColor: PRIMARY,
    backgroundColorActive: PRIMARY_DARK,
    iconColorActive: iconColors.WHITE,
    iconColor: iconColors.BLACK,
    textColorActive: textColors.WHITE,
    textColor: textColors.BLACK,
  },
  LIGHT: {
    backgroundColor: GREY_LIGHTER,
    backgroundColorActive: GREY_LIGHTER,
    iconColorActive: iconColors.PRIMARY,
    iconColor: iconColors.BLACK,
    textColorActive: textColors.PRIMARY,
    textColor: textColors.BLACK,
  },
};
