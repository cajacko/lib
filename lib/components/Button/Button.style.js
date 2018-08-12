// @flow
/* eslint require-jsdoc: 0 */

import styled from 'styled-components';
import { Div } from '../UI';
import types from '../../config/styles/buttons';

const getTypeThemeStyles = (type, theme) => {
  const typeStyles = Object.assign({}, types[type] || types.CONTAINED);

  let themeStyles = {};

  if (typeStyles.themes) {
    themeStyles = Object.assign(
      {},
      typeStyles.themes[theme] || typeStyles.themes.DEFAULT
    );
  }

  return Object.assign({}, typeStyles, themeStyles);
};

export const textStyles = (type, theme) => {
  const { textColor } = getTypeThemeStyles(type, theme);

  const styles = {
    type: 'button',
    color: textColor,
  };

  return styles;
};

export const iconStyles = ({ type, theme }) => {
  const { iconColor } = getTypeThemeStyles(type, theme);

  const styles = {
    color: iconColor,
  };

  return styles;
};

const outerStyle = ({
  type, theme, fullHeight, baseWidth,
}) => {
  const { width, height } = getTypeThemeStyles(type, theme);

  const heightStyle = fullHeight ? '100%' : height;

  const widthStyle = baseWidth || !width ? '' : `width: ${width}`;

  return `
    ${widthStyle};
    ${heightStyle ? `height: ${heightStyle}` : ''};
    
  `;
};

const innerStyle = ({ type, theme }) => {
  const {
    borderRadius,
    backgroundColor,
    paddingHorizontal,
  } = getTypeThemeStyles(type, theme);

  return `
    ${paddingHorizontal ? `padding-horizontal: ${paddingHorizontal}` : ''}
    ${borderRadius ? `border-radius: ${borderRadius}` : ''};
    ${backgroundColor ? `background-color: ${backgroundColor}` : ''};
  `;
};

export const nativeStyles = ({ styles }) => {
  if (styles && styles.button) return styles.button;

  return {
    flex: 1,
  };
};

export const Outer = styled(Div)`
  ${outerStyle};
`;

export const Inner = styled(Div)`
  flex: 1;
  align-items: center;
  justify-content: center;
  ${innerStyle};
`;
