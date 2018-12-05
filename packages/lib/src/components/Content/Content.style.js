// @flow

import styled from 'styled-components';
import { Div } from '../UI';
import { STANDARD_SPACING } from '../../config/styles/spacing';

// flex: 1 added to fill content area in HeaderWithContent, sizing of this
// can be controlled by a wrapper component otherwise
export const Container = styled(Div)`
  padding-horizontal: ${STANDARD_SPACING};
  padding-vertical: ${STANDARD_SPACING};
  flex: 1;
`;
