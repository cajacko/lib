// @flow

import {
  PRIMARY,
  BLACK,
  WHITE,
  GREY_DARK,
  PRIMARY_DARK,
  GREY_LIGHTER,
  SECONDARY,
  GREY,
  ERROR,
} from './colors';

export const COLORS = {
  PRIMARY,
  BLACK,
  WHITE,
  GREY_DARK,
  PRIMARY_DARK,
  GREY,
  ERROR,
};

export type Color = $Values<typeof COLORS>;

export const BACKGROUND_COLORS = {
  WHITE,
  PRIMARY,
  PRIMARY_DARK,
  GREY_LIGHTER,
  SECONDARY,
  ERROR,
};

export type BackgroundColor = $Values<typeof BACKGROUND_COLORS>;

const LIGHT_BACKGROUND = {
  default: COLORS.BLACK,
  highlight: COLORS.PRIMARY_DARK,
  greyedOut: COLORS.GREY,
  error: COLORS.ERROR,
};

export const COLORS_FOR_BACKGROUND = {
  [BACKGROUND_COLORS.WHITE]: LIGHT_BACKGROUND,
  [BACKGROUND_COLORS.PRIMARY]: {
    default: COLORS.BLACK,
    greyedOut: COLORS.GREY,
  },
  [BACKGROUND_COLORS.PRIMARY_DARK]: {
    default: COLORS.WHITE,
    greyedOut: COLORS.GREY,
  },
  [BACKGROUND_COLORS.GREY_LIGHTER]: LIGHT_BACKGROUND,
  [BACKGROUND_COLORS.SECONDARY]: {
    default: COLORS.BLACK,
  },
  [BACKGROUND_COLORS.ERROR]: {
    default: COLORS.WHITE,
  },
};
