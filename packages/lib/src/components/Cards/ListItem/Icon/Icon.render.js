// @flow

import React from 'react';
import Button from '../../../Button';
import buttons from '../../../../config/styles/buttons';
import type { Icon } from '../../../types';

type Props = {
  icon: Icon,
  action?: () => void,
  greyedOut?: boolean,
};

const defaultProps = {
  action: null,
  greyedOut: false,
};

/**
 * Icon button to be used in the cards list item
 */
const IconListItem = ({ icon, action, greyedOut }: Props) => (
  <Button
    type={buttons.ICON}
    fullHeight
    icon={icon}
    action={action}
    noButton={!action}
    greyedOut={greyedOut}
  />
);

IconListItem.defaultProps = defaultProps;

export default IconListItem;
