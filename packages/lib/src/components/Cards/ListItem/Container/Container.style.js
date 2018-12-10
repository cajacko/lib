// @flow

import styled from 'styled-components';
import { Div } from '../../../UI';
import { BACKGROUND_COLORS } from '../../../../config/styles/textIconColors';
import { GREY_LIGHT } from '../../../../config/styles/colors';
import {
  STANDARD_SPACING,
  HORIZONTAL_EDGE_PADDING,
} from '../../../../config/styles/spacing';

export const CARDS_VERTICAL_SPACING = STANDARD_SPACING;
export const CARDS_HORIZONTAL_SPACING = HORIZONTAL_EDGE_PADDING;

export const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

/**
 * Figure out what padding to apply to the inner container
 */
const applyPadding = direction => ({
  horizontalPadding,
  paddingLeft,
  paddingRight,
}) => {
  /**
   * Get the specific padding for the specified direction
   */
  const getPadding = (padding) => {
    if (typeof padding === 'number') return padding;

    if (typeof padding === 'boolean') {
      return padding ? CARDS_HORIZONTAL_SPACING : 0;
    }

    if (typeof horizontalPadding === 'number') return horizontalPadding;

    if (typeof horizontalPadding === 'boolean') {
      return horizontalPadding ? CARDS_HORIZONTAL_SPACING : 0;
    }

    return 0;
  };

  switch (direction) {
    case 'left':
      return getPadding(paddingLeft);
    case 'right':
      return getPadding(paddingRight);
    default:
      return 0;
  }
};

export const Container = styled(Div)`
  border-bottom-width: 1;
  border-bottom-color: ${GREY_LIGHT};
  background-color: ${BACKGROUND_COLOR};
`;

export const Inner = styled(Div)`
  flex: 1;
  flex-direction: row;
  min-height: 50;
  padding-left: ${applyPadding('left')}
  padding-right: ${applyPadding('right')}
`;
