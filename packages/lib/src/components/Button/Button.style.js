// @flow

import styled from 'styled-components';
import { Div } from '../UI';

const getTypeThemeStyles = (type) => {
  if (!type) {
    throw new Error('You must pass in a button type from config/styles/buttons');
  }

  if (type._isThemeRoot) return type.DEFAULT;

  return type;
};

export const textStyles = (type) => {
  const { textColor, backgroundColor } = getTypeThemeStyles(type);

  const styles = {
    type: 'button',
    _dangerouslySetColor: textColor,
    backgroundColor,
  };

  return styles;
};

export const iconStyles = (type) => {
  const { iconColor, backgroundColor } = getTypeThemeStyles(type);

  const styles = {
    _dangerouslySetColor: iconColor,
    backgroundColor,
  };

  return styles;
};

const outerStyle = ({ type, fullHeight, baseWidth }) => {
  const { width, height } = getTypeThemeStyles(type);

  const heightStyle = fullHeight ? '100%' : height;

  const widthStyle = baseWidth || !width ? '' : `width: ${width}`;

  return `
    ${widthStyle};
    ${heightStyle ? `height: ${heightStyle}` : ''};
    
  `;
};

const innerStyle = ({ type }) => {
  const {
    borderRadius,
    backgroundColor,
    paddingHorizontal,
  } = getTypeThemeStyles(type);

  return `
    ${paddingHorizontal ? `padding-horizontal: ${paddingHorizontal}` : ''}
    ${borderRadius ? `border-radius: ${borderRadius}` : ''};
    ${backgroundColor ? `background-color: ${backgroundColor}` : ''};
  `;
};

export const nativeStyles = ({ styles }) => {
  if (styles) return styles;

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
