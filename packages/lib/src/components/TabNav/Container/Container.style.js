// @flow

import styled from 'styled-components';
import { Div } from '../../UI';

export const Container = styled(Div)`
  background-color: ${({ theme: { backgroundColor } }) => backgroundColor};
  height: 60;
  flex-direction: row;
`;
