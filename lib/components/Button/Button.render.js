// @flow

import React, { Fragment } from 'react';
import { Button as UIButton } from '../UI';
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
  theme,
  text,
  icon,
  iconLeft,
  iconRight,
  style,
  fullHeight,
  ...props
}) => {
  /**
   * Render the button component with children
   *
   * @param {Object} buttonProps The props passed to the component
   *
   * @return {ReactElement} Markup to render
   */
  const ButtonWithProps = buttonProps => (
    <UIButton
      action={action}
      nativeStyles={nativeStyles({
        type,
        theme,
        style: buttonProps.style,
      })}
      {...buttonProps}
    />
  );

  let IconOnly;
  let RightIcon;
  let LeftIcon;

  if (icon) {
    const IconComponent = <Icon icon={icon} {...iconStyles(type, theme)} />;

    if (iconLeft) {
      LeftIcon = IconComponent;
    } else if (iconRight || text) {
      RightIcon = IconComponent;
    } else {
      IconOnly = IconComponent;
    }
  }

  return children ? (
    <ButtonWithProps style={style}>{children}</ButtonWithProps>
  ) : (
    <Outer type={type} theme={theme} fullHeight={fullHeight}>
      <ButtonWithProps>
        <Inner type={type} theme={theme}>
          {text ? (
            <Fragment>
              {LeftIcon}
              <Text text={text} {...textStyles(type, theme)} />
              {RightIcon}
            </Fragment>
          ) : (
            IconOnly
          )}
        </Inner>
      </ButtonWithProps>
    </Outer>
  );
};

export default Button;