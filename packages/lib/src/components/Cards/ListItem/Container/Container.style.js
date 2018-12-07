// @flow

import styled from 'styled-components';
import { Div } from '../../../UI';
import { BACKGROUND_COLORS } from '../../../../config/styles/textIconColors';
import { GREY_LIGHT } from '../../../../config/styles/colors';

const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

export const Container = styled(Div)`
  border-bottom-width: 1;
  border-bottom-color: ${GREY_LIGHT};
  background-color: ${BACKGROUND_COLOR};
`;

export const Inner = styled(Div)`
  flex: 1;
  flex-direction: row;
  min-height: 50;
`;
