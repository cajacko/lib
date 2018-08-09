// @flow

import styled from 'styled-components';
import { Div } from '../../UI';

const color = ({ isActive, activeColor }) => {
  if (!activeColor || !isActive) return '';

  return `
    background-color: ${activeColor};
  `;
};

export const Container = styled(Div)`
  flex: 1;
  ${color};
`;

export const buttonStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};
