// @flow

import { PRIMARY } from './colors';
import { COLORS as TEXT_COLORS } from './text';
import { COLORS as ICON_COLORS } from './icons';

const buttonBorderRadius = 5;
const buttonWidth = 150;
const buttonHeight = 40;

const styles = {
  ICON: {
    height: buttonHeight,
    width: buttonHeight,
    iconColor: ICON_COLORS.BLACK,
  },
  TRANSPARENT: {
    height: buttonHeight,
    width: buttonWidth,
  },
  OUTLINE: {
    height: buttonHeight,
    width: buttonWidth,
    borderRadius: buttonBorderRadius,
  },
  CONTAINED: {
    height: buttonHeight,
    width: buttonWidth,
    borderRadius: buttonBorderRadius,
    themes: {
      PRIMARY: {
        backgroundColor: PRIMARY,
        textColor: TEXT_COLORS.TEXT_ON_PRIMARY,
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

export default styles;
