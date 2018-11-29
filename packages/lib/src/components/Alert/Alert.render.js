// @flow

import React from 'react';
import Text from '../Text';
import { Div } from '../UI';

type Props = {
  text: string,
};

/**
 * Render a basic alert message
 *
 * @param {Object} props The props passed to the component
 *
 * @return {ReactElement} The markup to render
 */
const Alert = ({ text }: Props) => (
  <Div>
    <Text text={text} />
  </Div>
);

export default Alert;
