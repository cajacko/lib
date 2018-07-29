// @flow

import styled from 'styled-components';
import { Span } from '../UI';

const styles = {
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

const transformText = (text, { uppercase }) => {
  let transformedText = text;

  if (uppercase) transformedText = transformedText.toUpperCase();

  return transformedText;
};

const getTextStyle = ({ type }) => {
  const { size, weight, letterSpacing } = styles[type] || styles.body1;

  let fontWeight;

  switch (weight) {
    case 'light':
      fontWeight = 200;
      break;
    case 'medium':
      fontWeight = 600;
      break;
    default:
      fontWeight = 400;
      break;
  }

  return `
    font-size: ${size};
    font-weight: ${fontWeight};
    letter-spacing: ${letterSpacing};
  `;
};

export const Text = styled(Span)`
  ${getTextStyle};
`;
