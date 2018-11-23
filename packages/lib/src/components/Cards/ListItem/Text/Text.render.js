// @flow

import React from 'react';
import Text from '../../../Text';

const CardsListItemText = ({ text, numberOfLines, backgroundColor }) => (
  <Text
    numberOfLines={numberOfLines}
    text={text}
    type="body2"
    backgroundColor={backgroundColor}
  />
);

CardsListItemText.defaultProps = {
  numberOfLines: 2,
};

export default CardsListItemText;
