// @flow

import React from 'react';
import Text from '../../Text';
import { Container } from './SectionHeader.style';

/**
 * Render a section header for a cards list
 *
 * @param {Object} props The props passed to the component, check flow for more detail
 *
 * @return {ReactElement} The components markup to render
 */
const CardsSectionHeader = ({ title }) => (
  <Container>
    <Text text={title} type="body2" />
  </Container>
);

export default CardsSectionHeader;
