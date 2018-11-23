// @flow

import React from 'react';
import { Container } from './Align.style';

/**
 * Container for aligning content
 *
 * @param {Object} props The props passed to the component, check flow for more detail
 *
 * @return {ReactElement} The components markup to render
 */
const Align = ({ children, ...props }) => (
  <Container {...props}>{children}</Container>
);

export default Align;
