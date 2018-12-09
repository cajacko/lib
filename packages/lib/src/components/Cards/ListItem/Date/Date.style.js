// @flow

import styled from 'styled-components';
import { Div } from '../../../UI';
import { CARDS_VERTICAL_SPACING } from '../Container/Container.style';

export const Right = styled(Div)`
  width: 80;
  align-items: center;
  padding-vertical: ${CARDS_VERTICAL_SPACING};
  justify-content: center;
`;
