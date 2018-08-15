// @flow

import { COLORS, BACKGROUND_COLORS } from './textIconColors';
import { STANDARD_SPACING } from './spacing';

const buttonBorderRadius = 5;
const buttonWidth = 150;
const buttonHeight = 40;
const buttonPaddingHorizontal = STANDARD_SPACING;

const styles = {
  ICON: {
    height: buttonHeight,
    width: buttonHeight,
    iconColor: COLORS.BLACK,
  },
  TRANSPARENT: {
    height: buttonHeight,
    width: buttonWidth,
    paddingHorizontal: buttonPaddingHorizontal,
    themes: {
      PRIMARY: {
        textColor: COLORS.PRIMARY,
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
        backgroundColor: BACKGROUND_COLORS.PRIMARY,
      },
      SECONDARY: {
        backgroundColor: BACKGROUND_COLORS.SECONDARY,
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
