// @flow

import React from 'react';
import Button from '../../../Button';
import Text from '../../../Text';
import { BACKGROUND_COLORS } from '../../../../config/styles/textIconColors';
import { Container, Inner } from './Text.style';

type Props = {
  text: string,
  action?: () => void,
  greyedOut?: boolean,
  numberOfLines?: number,
  innerStyles?: { [string]: * },
};

const defaultProps = {
  action: null,
  greyedOut: false,
  numberOfLines: null,
  innerStyles: null,
};

/**
 * Text item for use in the card list item
 */
const TextListItem = ({
  text,
  action,
  greyedOut,
  numberOfLines,
  innerStyles,
}: Props) => (
  <Container>
    <Button
      action={action}
      noButton={!action}
      styles={{ height: '100%', flex: 1 }}
    >
      <Inner style={innerStyles}>
        <Text
          numberOfLines={numberOfLines}
          text={text}
          type="body2"
          backgroundColor={BACKGROUND_COLORS.WHITE}
          greyedOut={greyedOut}
        />
      </Inner>
    </Button>
  </Container>
);

TextListItem.defaultProps = defaultProps;

export default TextListItem;
