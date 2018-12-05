// @flow

import * as React from 'react';
import { ListItem } from 'native-base';
import CardsListItemWithDate from '../WithDate';
import CardsListItemWithIcon from '../WithIcon';
import WithTextInput from '../WithTextInput';
import CardsListItemText from '../Text';
import { BACKGROUND_COLORS } from '../../../../config/styles/textIconColors';
import type { Icon } from '../../../types';

type Props = {
  action?: () => void,
  leftIcon?: Icon,
  rightIcon?: Icon,
  withDate?: boolean,
  isTextInput?: boolean,
};

const defaultProps = {
  action: null,
  leftIcon: null,
  rightIcon: null,
  withDate: false,
  isTextInput: false,
};

const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

/**
 * Get the card component to render based off the passed in props
 */
const getComponent = ({
  withDate, leftIcon, rightIcon, isTextInput,
}) => {
  if (withDate) return CardsListItemWithDate;
  if (leftIcon || rightIcon) return CardsListItemWithIcon;
  if (isTextInput) return WithTextInput;

  return CardsListItemText;
};

/**
 * Render a card, with optional action
 */
const CardsListItem = ({ action, ...props }: Props) => {
  const Component = getComponent(props);

  return (
    <ListItem button={!!action} onPress={action}>
      <Component backgroundColor={BACKGROUND_COLOR} {...props} />
    </ListItem>
  );
};

CardsListItem.defaultProps = defaultProps;

export default CardsListItem;
