// @flow

import * as React from 'react';
import { ListItem } from 'native-base';
import CardsListItemWithDate from '../WithDate';
import CardsListItemWithIcon from '../WithIcon';
import CardsListItemText from '../Text';
import { BACKGROUND_COLORS } from '../../../../config/styles/textIconColors';
import type { Icon } from '../../../types';

type Props = {
  action?: () => void,
  leftIcon?: Icon,
  rightIcon?: Icon,
  withDate?: boolean,
};

const defaultProps = {
  action: null,
  leftIcon: null,
  rightIcon: null,
  withDate: false,
};

const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

/**
 * Get the card component to render based off the passed in props
 */
const getComponent = ({ withDate, leftIcon, rightIcon }) => {
  if (withDate) return CardsListItemWithDate;
  if (leftIcon || rightIcon) return CardsListItemWithIcon;

  return CardsListItemText;
};

/**
 * Render a card, with optional action
 */
const CardsListItem = ({ action, ...props }: Props) => {
  const Component = getComponent(props);

  return (
    <ListItem button onPress={action}>
      <Component backgroundColor={BACKGROUND_COLOR} {...props} />
    </ListItem>
  );
};

CardsListItem.defaultProps = defaultProps;

export default CardsListItem;
