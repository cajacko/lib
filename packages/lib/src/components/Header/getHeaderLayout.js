// @flow

import { BACK, CLOSE } from '../../config/icons';
import buttons from '../../config/styles/buttons';
import type { Props } from './Header.render';

/**
 * 1 place to decide what to show in the header. As we can have the following:
 * - A left icon or text button
 * - A central title (could be a button)
 * - A right icon or text button
 * - An array of right icons or text buttons
 */
const getHeaderLayout = ({
  back,
  leftText,
  leftAction,
  leftButtonStyle,
  title,
  titleAction,
  noButton,
  rightText,
  rightAction,
  rightButtonStyle,
  rightButtons,
  horizontalMargin,
  cancel,
}: Props) => {
  const elements = {};

  if (back || cancel) {
    elements.left = {
      container: {
        hasFixedWidth: true,
      },
      button: {
        action: back || cancel,
        icon: back ? BACK : CLOSE,
        type: buttons.ICON,
        fullHeight: true,
      },
    };
  } else if (!!leftText && !!leftAction) {
    elements.left = {
      container: {},
      button: {
        baseWidth: true,
        action: leftAction,
        text: leftText,
        type: leftButtonStyle || buttons.TRANSPARENT.GREY_DARK,
        fullHeight: true,
      },
    };
  }

  if (rightButtons) {
    elements.right = rightButtons.map(({
      key, text, action, icon,
    }) => ({
      container: {
        key,
        hasFixedWidth: !!icon,
      },
      button: icon
        ? {
          action,
          icon,
          type: buttons.ICON,
          fullHeight: true,
        }
        : {
          baseWidth: true,
          action,
          text,
          type: rightButtonStyle || buttons.TRANSPARENT,
          fullHeight: true,
        },
    }));
  } else if (!!rightText && !!rightAction) {
    elements.right = {
      container: {},
      button: {
        baseWidth: true,
        action: rightAction,
        text: rightText,
        type: rightButtonStyle || buttons.TRANSPARENT,
        fullHeight: true,
      },
    };
  }

  if (title) {
    elements.title = {
      container: {
        hasSides: !!elements.right || !!elements.left,
        horizontalMargin,
      },
      button: {
        text: title,
        action: titleAction,
        type: buttons.TRANSPARENT.BLACK,
        fullHeight: true,
        baseWidth: true,
        noButton: !titleAction || noButton,
      },
    };
  }

  return elements;
};

export default getHeaderLayout;
