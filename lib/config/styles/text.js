// @flow

import { PRIMARY, BLACK, WHITE, TEXT_ON_PRIMARY } from './colors';

export const COLORS = {
  PRIMARY,
  BLACK,
  WHITE,
  TEXT_ON_PRIMARY,
};

export const TYPES = {
  h1: {
    uppercase: false,
    weight: 'light',
    size: 96,
    letterSpacing: -1.5,
  },
  h2: {
    uppercase: false,
    weight: 'light',
    size: 60,
    letterSpacing: -0.5,
  },
  h3: {
    uppercase: false,
    weight: 'regular',
    size: 48,
    letterSpacing: 0,
  },
  h4: {
    uppercase: false,
    weight: 'regular',
    size: 34,
    letterSpacing: 0.5,
  },
  h5: {
    uppercase: false,
    weight: 'regular',
    size: 24,
    letterSpacing: 0,
  },
  h6: {
    uppercase: false,
    weight: 'medium',
    size: 20,
    letterSpacing: 0.15,
  },
  subtitle1: {
    uppercase: false,
    weight: 'regular',
    size: 16,
    letterSpacing: 0.15,
  },
  subtitle2: {
    uppercase: false,
    weight: 'medium',
    size: 14,
    letterSpacing: 0.1,
  },
  body1: {
    uppercase: false,
    weight: 'regular',
    size: 16,
    letterSpacing: 0.1,
  },
  body2: {
    uppercase: false,
    weight: 'regular',
    size: 14,
    letterSpacing: 0.25,
  },
  button: {
    uppercase: true,
    weight: 'medium',
    size: 14,
    letterSpacing: 0.75,
  },
  caption: {
    uppercase: false,
    weight: 'regular',
    size: 12,
    letterSpacing: 0.4,
  },
  overline: {
    uppercase: true,
    weight: 'regular',
    size: 10,
    letterSpacing: 1.5,
  },
};

const INPUT_TYPE = TYPES.body1;

export const INPUT_STYLES = {
  size: INPUT_TYPE.size,
};
