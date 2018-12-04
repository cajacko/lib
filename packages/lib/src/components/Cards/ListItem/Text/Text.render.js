// @flow

import React from 'react';
import Text from '../../../Text';
import type { TextValue } from '../../../Text/Text.render';
import type { BackgroundColor } from '../../../../config/styles/textIconColors';

type Props = {
  text: TextValue,
  numberOfLines?: number,
  backgroundColor: BackgroundColor,
  greyedOut?: boolean,
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
}: Props) => (
  <Text
    numberOfLines={numberOfLines}
    text={text}
    type="body2"
    backgroundColor={backgroundColor}
    greyedOut={greyedOut}
  />
);

CardsListItemText.defaultProps = defaultProps;

export default CardsListItemText;
