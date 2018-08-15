// @flow

import textIconColor from '../../utils/textIconColor';

const getProps = ({
  _dangerouslySetColor,
  backgroundColor,
  highlight,
  ...props
}) => ({
  style: {
    color: textIconColor({ _dangerouslySetColor, backgroundColor, highlight }),
  },
  ...props,
});

const Icon = ({ icon, ...props }) =>
  typeof icon === 'function' && icon(getProps(props));

export default Icon;
