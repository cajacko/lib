// @flow

import styled from 'styled-components';
import color from 'color';
import { Div } from '../UI';
import { WHITE, BLACK } from '../../config/styles/colors';

export const Container = styled(Div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const HideArea = styled(Div)`
  flex: 1;
  background-color: ${color(BLACK)
    .alpha(0.4)
    .string()};
`;

export const DatePickerContainer = styled(Div)`
  background-color: ${WHITE};
`;
