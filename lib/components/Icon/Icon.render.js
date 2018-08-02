// @flow

import { COLORS } from '../../config/styles/icons';
import ensureObjHasVal from '../../utils/ensureObjHasVal';

const getProps = ({ color, ...props }) => {
  const finalColor = color || COLORS.BLACK;

  return {
    style: {
      color: ensureObjHasVal(
        COLORS,
        finalColor,
        new Error(`Icon is not allowed to have the color ${String(finalColor)}`)
      ),
    },
    ...props,
  };
};

const Icon = ({ icon, ...props }) =>
  typeof icon === 'function' && icon(getProps(props));

export default Icon;
