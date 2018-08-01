// @flow

import styled from 'styled-components';
import { Div } from '../../UI';

const center = ({ center }) => {
  if (!center) return '';

  return `
    align-items: center;
    justify-content: center;
  `;
};

export const nativeStyles = () => ({
  flex: 1,
});

export const Outer = styled(Div)`
  flex: 1;
`;

export const Inner = styled(Div)`
  flex: 1;
  ${center};
`;
