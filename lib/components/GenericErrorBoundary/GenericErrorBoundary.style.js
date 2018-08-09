// @flow

import styled from 'styled-components';
import { Div } from '../UI';
import { STANDARD_SPACING } from '../../config/styles/spacing';
import { WHITE } from '../../config/styles/colors';

export const Container = styled(Div)`
  background-color: ${WHITE};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${STANDARD_SPACING};
  padding-vertical: ${STANDARD_SPACING};
`;

export const Inner = styled(Div)`
  align-items: center;
`;

export const Button = styled(Div)``;

export const BottomMargin = styled(Div)`
  margin-bottom: ${({ hasMargin }) => (hasMargin ? STANDARD_SPACING * 2 : 0)};
`;
