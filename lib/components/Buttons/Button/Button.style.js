// @flow

import styled from 'styled-components';
import { Div } from '../../UI';
import { PRIMARY } from '../../../config/styles/colors';

const types = {
  TRANSPARENT: {},
  OUTLINE: {},
  CONTAINED: {},
  TOGGLE: {},
};

const themes = {
  PRIMARY: {},
};

const center = ({ center }) => {
  if (!center) return '';

  return `
    align-items: center;
    justify-content: center;
  `;
};

export const nativeStyles = () => ({
  // flex: 1,
});

export const Outer = styled(Div)``;

export const Inner = styled(Div)`
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY};
  border-radius: 5;
  height: 40;
`;
