// @flow

import styled from 'styled-components';
import { Div } from '../UI';
import { WHITE } from '../../config/styles/colors';

export const Container = styled(Div)`
  flex: 1;
`;

export const Background = styled(Div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
`;

export const Part = styled(Div)`
  flex: 1;
  ${({ color }) => (color ? `background-color:  ${color}` : '')};
`;

export const ForeGround = styled(Div)`
  flex: 1;
  z-index: 1;
`;

export const Inner = styled(Div)`
  flex: 1;
  background-color: ${WHITE};
`;
