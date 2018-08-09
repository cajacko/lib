// @flow

import { PRIMARY, TEXT_ON_PRIMARY } from './colors';

const buttonBorderRadius = 5;
const buttonWidth = 150;
const buttonHeight = 40;

const styles = {
  NONE: {},
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
        textColor: TEXT_ON_PRIMARY,
      },
    },
  },
  TOGGLE: {
    height: buttonHeight,
    width: buttonWidth,
  },
};

export default styles;
