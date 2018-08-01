// @flow

import styled from 'styled-components';
import { Span } from '../UI';
import styles from '../../config/styles/text';
import { BLACK } from '../../config/styles/colors';

const getStyle = type => styles[type] || styles.body1;

export const transformText = (text, { type }) => {
  const { uppercase } = getStyle(type);

  let transformedText = text;

  if (uppercase) transformedText = transformedText.toUpperCase();

  return transformedText;
};

const getTextStyle = ({ type }) => {
  const { size, weight, letterSpacing } = getStyle(type);

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
    color: ${BLACK};
  `;
};

export const Text = styled(Span)`
  ${getTextStyle};
`;
