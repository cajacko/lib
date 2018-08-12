import React from 'react';
import Text from '../../../Text';

const CardsListItemText = ({ text, numberOfLines }) => (
  <Text numberOfLines={numberOfLines} text={text} type="body2" />
);

CardsListItemText.defaultProps = {
  numberOfLines: 2,
};

export default CardsListItemText;
