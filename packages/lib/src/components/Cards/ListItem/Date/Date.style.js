// @flow

import styled from 'styled-components';
import { Div } from '../../../UI';
import { CARDS_LIST_ITEM_SPACING } from '../Container/Container.style';

export const Right = styled(Div)`
  width: 80;
  align-items: center;
  padding-vertical: ${CARDS_LIST_ITEM_SPACING};
  justify-content: center;
`;
