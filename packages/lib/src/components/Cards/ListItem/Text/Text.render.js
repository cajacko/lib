// @flow

import React from 'react';
import Text from '../../../Text';
import type { TextValue } from '../../../Text/Text.render';
import type { BackgroundColor } from '../../../../config/styles/textIconColors';
import Button from '../../../Button';

type Props = {
  text: TextValue,
  numberOfLines?: number,
  backgroundColor: BackgroundColor,
  greyedOut?: boolean,
  textAction: () => void,
};

const defaultProps = {
  numberOfLines: 2,
  greyedOut: false,
};

/**
 * Display a text card
 */
const CardsListItemText = ({
  text,
  numberOfLines,
  backgroundColor,
  greyedOut,
  textAction,
}: Props) => (
  <Button action={textAction} noButton={!textAction}>
    <Text
      numberOfLines={numberOfLines}
      text={text}
      type="body2"
      backgroundColor={backgroundColor}
      greyedOut={greyedOut}
    />
  </Button>
);

CardsListItemText.defaultProps = defaultProps;

export default CardsListItemText;
