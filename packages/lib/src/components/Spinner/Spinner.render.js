// @flow

import React from 'react';
import { Animated } from 'react-native';
import Icon from '../Icon';
import Text from '../Text';
import { SPINNER } from '../../config/icons';
import { Container, TextContainer, iconStyle } from './Spinner.style';
import type { TextValue } from '../../utils/getText';

type Props = {
  backgroundColor: string,
  rotation: *,
  text?: TextValue,
};

const defaultProps = {
  text: null,
};

/**
 * The markup for the spinner
 */
const Spinner = ({ backgroundColor, rotation, text }: Props) => (
  <Container>
    <Animated.View
      style={{
        transform: [{ rotate: rotation }],
      }}
    >
      <Icon
        backgroundColor={backgroundColor}
        icon={SPINNER}
        style={iconStyle}
      />
    </Animated.View>

    {text && (
      <TextContainer>
        <Text backgroundColor={backgroundColor} text={text} type="overline" />
      </TextContainer>
    )}
  </Container>
);

Spinner.defaultProps = defaultProps;

export default Spinner;
