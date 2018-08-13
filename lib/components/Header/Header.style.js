// @flow

import styled from 'styled-components';
import { Div } from '../UI';
import { GREY_LIGHTER } from '../../config/styles/colors';

const sideWidth = 40;

const applyWidth = ({ hasFixedWidth }) =>
  (hasFixedWidth ? `width: ${sideWidth}` : '');

const bodySpacing = ({ hasSides }) => {
  if (!hasSides) return '';

  return `
    margin-horizontal: ${sideWidth};
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
`;

export const Left = styled(Div)`
  ${applyWidth};
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
`;

export const Right = styled(Div)`
  ${applyWidth};
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;
