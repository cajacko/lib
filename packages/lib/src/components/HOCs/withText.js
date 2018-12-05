// @flow

// Can't get that long line to wrap without prettier being a dick
/* eslint max-len: 0 */

import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import getText from '../../utils/getText';

type PropKeys = Array<string>;
type Props = { [string]: any }; // eslint-disable-next-line

/**
 * Get the actual text for the component, given the marketing text or
 * an override object.
 *
 * Eslint and prettier won't wrap this properly, damn it
 */
const withText = (...propKeys: PropKeys) => (Component: *) => (props: Props) => {
  const newProps = cloneDeep(props);

  propKeys.forEach((key) => {
    const val = props[key];

    if (val === undefined) return;

    const text = getText(val);

    newProps[key] = text;
  });

  return <Component {...newProps} />;
};

export default withText;
