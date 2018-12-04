// @flow

import styled from 'styled-components';
import { Div } from '../../../UI';
import { STANDARD_SPACING } from '../../../../config/styles/spacing';

export const Left = styled(Div)`
  margin-right: ${STANDARD_SPACING};
`;

export const Right = styled(Div)`
  margin-left: ${STANDARD_SPACING};
`;
