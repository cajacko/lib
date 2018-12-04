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
} from './colors';

export const COLORS = {
  PRIMARY,
  BLACK,
  WHITE,
  GREY_DARK,
  PRIMARY_DARK,
  GREY,
};

export type Color = $Values<typeof COLORS>;

export const BACKGROUND_COLORS = {
  WHITE,
  PRIMARY,
  PRIMARY_DARK,
  GREY_LIGHTER,
  SECONDARY,
};

export type BackgroundColor = $Values<typeof BACKGROUND_COLORS>;

const LIGHT_BACKGROUND = {
  default: COLORS.BLACK,
  highlight: COLORS.PRIMARY_DARK,
  greyedOut: COLORS.GREY,
};

export const COLORS_FOR_BACKGROUND = {
  [BACKGROUND_COLORS.WHITE]: LIGHT_BACKGROUND,
  [BACKGROUND_COLORS.PRIMARY]: {
    default: COLORS.BLACK,
  },
  [BACKGROUND_COLORS.PRIMARY_DARK]: {
    default: COLORS.WHITE,
  },
  [BACKGROUND_COLORS.GREY_LIGHTER]: LIGHT_BACKGROUND,
  [BACKGROUND_COLORS.SECONDARY]: {
    default: COLORS.BLACK,
  },
};
