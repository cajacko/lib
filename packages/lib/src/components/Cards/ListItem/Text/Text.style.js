// @flow

import styled from 'styled-components';
import { Div } from '../../../UI';
import { CARDS_LIST_ITEM_SPACING } from '../Container/Container.style';

export const Container = styled(Div)`
  flex: 1;
  height: 100%;
`;

export const Inner = styled(Div)`
  flex: 1;
  justify-content: center;
  padding-vertical: ${CARDS_LIST_ITEM_SPACING};
`;
