// @flow

import textIconColor from '../../utils/textIconColor';
import type { Icon as IconType } from '../types';
import type {
  Color,
  BackgroundColor,
} from '../../config/styles/textIconColors';

type Props = {
  icon: IconType,
  _dangerouslySetColor?: Color,
  backgroundColor?: BackgroundColor,
  highlight?: boolean,
  greyedOut?: boolean,
};

/**
 * Get the actual style props we want to apply, based off the component props
 */
const getProps = ({
  _dangerouslySetColor,
  backgroundColor,
  highlight,
  greyedOut,
  ...props
}) => ({
  style: {
    color: textIconColor({
      _dangerouslySetColor,
      backgroundColor,
      highlight,
      greyedOut,
    }),
  },
  ...props,
});

/**
 * Display and icon
 */
const Icon = ({ icon, ...props }: Props) =>
  typeof icon === 'function' && icon(getProps(props));

export default Icon;
