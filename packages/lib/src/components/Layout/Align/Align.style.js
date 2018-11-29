// @flow

import styled from 'styled-components';
import { Div } from '../../UI';

export const Container = styled(Div)`
  flex: 1;
  ${({ centerHorizontally }) =>
    (centerHorizontally ? 'align-items: center' : '')};
`;
