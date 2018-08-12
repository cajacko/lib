// @flow

import { PRIMARY, SECONDARY } from './colors';
import { COLORS as TEXT_COLORS } from './text';
import { COLORS as ICON_COLORS } from './icons';
import { STANDARD_SPACING } from './spacing';

const buttonBorderRadius = 5;
const buttonWidth = 150;
const buttonHeight = 40;
const buttonPaddingHorizontal = STANDARD_SPACING;

const styles = {
  ICON: {
    height: buttonHeight,
    width: buttonHeight,
    iconColor: ICON_COLORS.BLACK,
  },
  TRANSPARENT: {
    height: buttonHeight,
    width: buttonWidth,
    paddingHorizontal: buttonPaddingHorizontal,
    themes: {
      PRIMARY: {
        textColor: TEXT_COLORS.TEXT_PRIMARY_ON_WHITE,
      },
      BLACK: {
        textColor: TEXT_COLORS.BLACK,
      },
    },
  },
  OUTLINE: {
    height: buttonHeight,
    width: buttonWidth,
    borderRadius: buttonBorderRadius,
    paddingHorizontal: buttonPaddingHorizontal,
  },
  CONTAINED: {
    height: buttonHeight,
    width: buttonWidth,
    borderRadius: buttonBorderRadius,
    paddingHorizontal: buttonPaddingHorizontal,
    themes: {
      PRIMARY: {
        backgroundColor: PRIMARY,
        textColor: TEXT_COLORS.TEXT_ON_PRIMARY,
      },
      SECONDARY: {
        backgroundColor: SECONDARY,
        textColor: TEXT_COLORS.TEXT_ON_SECONDARY,
      },
    },
  },
  TOGGLE: {
    height: buttonHeight,
    width: buttonWidth,
  },
};

const setDefault = (type, defaultVal) => {
  styles[type].themes.DEFAULT = styles[type].themes[defaultVal];
};

setDefault('CONTAINED', 'PRIMARY');
setDefault('TRANSPARENT', 'PRIMARY');

export default styles;
