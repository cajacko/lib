// @flow

import styled from 'styled-components';
import { Div } from '../UI';
import { STANDARD_SPACING } from '../../config/styles/spacing';
import { BACKGROUND_COLORS } from '../../config/styles/textIconColors';

export const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

export const Container = styled(Div)`
  background-color: ${BACKGROUND_COLOR};
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
