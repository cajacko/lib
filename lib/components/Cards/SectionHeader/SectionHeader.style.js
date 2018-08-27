// @flow

import styled from 'styled-components';
import { Div } from '../../UI';
import { STANDARD_SPACING } from '../../../config/styles/spacing';
import { BACKGROUND_COLORS } from '../../../config/styles/textIconColors';

export const BACKGROUND_COLOR = BACKGROUND_COLORS.GREY_LIGHTER;

export const Container = styled(Div)`
  padding-horizontal: ${STANDARD_SPACING};
  padding-vertical: ${STANDARD_SPACING};
  background-color: ${BACKGROUND_COLOR};
`;
