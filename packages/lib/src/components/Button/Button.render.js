// @flow

import React, { Fragment } from 'react';
import { Button as UIButton, Div } from '../UI';
import {
  Outer,
  Inner,
  nativeStyles,
  textStyles,
  iconStyles,
} from './Button.style';
import Text from '../Text';
import Icon from '../Icon';

/**
 * Render a button component
 *
 * @param {Object} props Props passed to the component
 *
 * @return {ReactElement} Markup to render
 */
const Button = ({
  action,
  children,
  type,
  text,
  icon,
  iconLeft,
  iconRight,
  styles,
  fullHeight,
  baseWidth,
  noButton,
  noContent,
  numberOfLines,
}) => {
  let ButtonComponent;
  const buttonProps = { ...styles };

  const nativeStylesProp = nativeStyles({
    type,
    styles,
  });

  if (noButton) {
    ButtonComponent = Div;
    buttonProps.style = nativeStylesProp;
  } else {
    ButtonComponent = UIButton;
    buttonProps.nativeStyles = nativeStylesProp;
    buttonProps.action = action;
  }

  let IconOnly;
  let RightIcon;
  let LeftIcon;

  if (icon) {
    const IconComponent = <Icon icon={icon} {...iconStyles(type)} />;

    if (iconLeft) {
      LeftIcon = IconComponent;
    } else if (iconRight || text) {
      RightIcon = IconComponent;
    } else {
      IconOnly = IconComponent;
    }
  }

  return children || noContent ? (
    <ButtonComponent {...buttonProps}>{children || null}</ButtonComponent>
  ) : (
    <Outer type={type} fullHeight={fullHeight} baseWidth={baseWidth}>
      <ButtonComponent {...buttonProps}>
        <Inner type={type}>
          {text ? (
            <Fragment>
              {LeftIcon}
              <Text
                text={text}
                {...textStyles(type)}
                numberOfLines={numberOfLines}
              />
              {RightIcon}
            </Fragment>
          ) : (
            IconOnly
          )}
        </Inner>
      </ButtonComponent>
    </Outer>
  );
};

export default Button;
