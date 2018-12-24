// @flow

import {
  COLORS,
  BACKGROUND_COLORS,
  COLORS_FOR_BACKGROUND,
} from './textIconColors';
import { STANDARD_SPACING } from './spacing';

export const BUTTON_BORDER_RADIUS = 5;
const buttonWidth = 150;
const buttonHeight = 40;
const buttonPaddingHorizontal = STANDARD_SPACING;
const circleSize = 60;

const styles = {
  ICON: {
    height: buttonHeight,
    width: buttonHeight,
    themes: {
      DEFAULT: {
        iconColor: COLORS_FOR_BACKGROUND[BACKGROUND_COLORS.WHITE].default,
      },
      GREYED_OUT: {
        iconColor: COLORS_FOR_BACKGROUND[BACKGROUND_COLORS.WHITE].greyedOut,
      },
    },
  },
  TRANSPARENT: {
    height: buttonHeight,
    width: buttonWidth,
    paddingHorizontal: buttonPaddingHorizontal,
    themes: {
      PRIMARY: {
        textColor: COLORS.PRIMARY_DARK,
      },
      BLACK: {
        textColor: COLORS.BLACK,
      },
      GREY_DARK: {
        textColor: COLORS.GREY_DARK,
      },
    },
  },
  OUTLINE: {
    height: buttonHeight,
    width: buttonWidth,
    borderRadius: BUTTON_BORDER_RADIUS,
    paddingHorizontal: buttonPaddingHorizontal,
  },
  CONTAINED: {
    height: buttonHeight,
    width: buttonWidth,
    borderRadius: BUTTON_BORDER_RADIUS,
    paddingHorizontal: buttonPaddingHorizontal,
    themes: {
      PRIMARY: {
        backgroundColor: BACKGROUND_COLORS.PRIMARY,
      },
      SECONDARY: {
        backgroundColor: BACKGROUND_COLORS.SECONDARY,
      },
    },
  },
  CONTAINED_CIRCLE_ICON: {
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize / 2,
    themes: {
      PRIMARY: {
        backgroundColor: BACKGROUND_COLORS.PRIMARY,
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

setDefault('CONTAINED_CIRCLE_ICON', 'PRIMARY');
setDefault('CONTAINED', 'PRIMARY');
setDefault('TRANSPARENT', 'PRIMARY');

const exportProps = {};

Object.keys(styles).forEach((type) => {
  const style = styles[type];
  const typeStyles = Object.assign({}, style);
  delete typeStyles.themes;

  const typeObj = {
    _isThemeRoot: true,
  };

  if (style.themes) {
    Object.keys(style.themes).forEach((theme) => {
      typeObj[theme] = {
        ...typeStyles,
        ...style.themes[theme],
      };
    });
  } else {
    typeObj.DEFAULT = {
      ...typeStyles,
    };
  }

  exportProps[type] = typeObj;
});

export default exportProps;
