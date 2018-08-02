// @flow

import styled from 'styled-components';
import { Div } from '../../UI';
import { GREY_LIGHTER } from '../../../config/styles/colors';

export const Container = styled(Div)`
  background-color: ${GREY_LIGHTER};
  height: 40;
  flex-direction: row;
`;
