// @flow

import styled from 'styled-components';
import { Div } from '../../UI';
import { STANDARD_SPACING } from '../../../config/styles/spacing';
import { GREY_LIGHTER } from '../../../config/styles/colors';

export const Container = styled(Div)`
  padding-horizontal: ${STANDARD_SPACING};
  padding-vertical: ${STANDARD_SPACING};
  background-color: ${GREY_LIGHTER};
`;
