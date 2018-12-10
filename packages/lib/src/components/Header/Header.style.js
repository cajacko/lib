// @flow

import styled from 'styled-components';
import { Div } from '../UI';
import { GREY_LIGHTER } from '../../config/styles/colors';

const sideWidth = 40;
const sideZIndex = 2;

/**
 * Apply the width if it exists
 */
const applyWidth = ({ hasFixedWidth }) =>
  (hasFixedWidth ? `width: ${sideWidth}` : '');

/**
 * Get the margin for the title, can pass in custom horizontal margin
 */
const bodySpacing = ({ hasSides, horizontalMargin }) => {
  if (!hasSides) return '';

  return `
    margin-horizontal: ${
  typeof horizontalMargin === 'number' ? horizontalMargin : sideWidth
};
  `;
};

export const Header = styled(Div)`
  background-color: ${GREY_LIGHTER};
  height: 50;
`;

export const Body = styled(Div)`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${bodySpacing};
  z-index: ${sideZIndex - 1};
`;

const Side = styled(Div)`
  ${applyWidth};
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: ${sideZIndex};
  flex-direction: row;
`;

export const Left = styled(Side)`
  left: 0;
`;

export const Right = styled(Side)`
  right: 0;
`;

export const MultipleRight = styled(Div)`
  ${applyWidth};
  margin-left: 10;
`;
