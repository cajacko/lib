// @flow

import styled from 'styled-components';
import { Div } from '../UI';

const iconSize = 30;

export const Container = styled(Div)`
  align-items: center;
  justify-content: center;
`;

export const TextContainer = styled(Div)`
  margin-top: 10;
`;

export const iconStyle = {
  fontSize: iconSize,
  height: iconSize,
  width: iconSize,
  textAlign: 'center',
};
