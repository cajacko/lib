// @flow

import React from 'react';
import { Container } from './TextArea.style';
import Text from '../../Text';
import ExpandingTextInput from '../../ExpandingTextInput';

/**
 * Renders an editable textarea or static text that appears the same. Can autoexpand
 *
 * @param {Object} props The props passed to the component, check flow for more detail
 *
 * @return {ReactElement} The components markup to render
 */
const TextArea = ({ value, onChange, canEdit }) => (
  <Container>
    {canEdit ? (
      <ExpandingTextInput value={value} onChange={onChange} />
    ) : (
      <Text text={value} type="body1" />
    )}
  </Container>
);

export default TextArea;
