// @flow

import React from 'react';
import Button from '../../../Button';
import buttons from '../../../../config/styles/buttons';
import type { Icon } from '../../../types';
import { CARDS_VERTICAL_SPACING } from '../Container/Container.style';

type Props = {
  icon: Icon,
  action?: () => void,
  greyedOut?: boolean,
  innerStyles?: { [string]: * },
};

const defaultProps = {
  action: null,
  greyedOut: false,
  innerStyles: {},
};

/**
 * Icon button to be used in the cards list item
 */
const IconListItem = ({
  icon, action, greyedOut, innerStyles,
}: Props) => (
  <Button
    type={greyedOut ? buttons.ICON.GREYED_OUT : buttons.ICON}
    fullHeight
    icon={icon}
    action={action}
    noButton={!action}
    styles={{ paddingVertical: CARDS_VERTICAL_SPACING, ...innerStyles }}
  />
);

IconListItem.defaultProps = defaultProps;

export default IconListItem;
