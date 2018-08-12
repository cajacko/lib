// @flow

import React from 'react';
import { Container, Text, TextInput } from './ExpandingTextInput.style';

/**
 * Render a multiline text input that can expand it's height
 *
 * @param {Object} props The props passed to the component, check flow for more detail
 *
 * @return {ReactElement} The components markup to render
 */
const ExpandingTextInput = ({
  onChange,
  onLayout,
  setRef,
  inputHeight,
  hiddenWidth,
  text,
  value,
  editable,
}) => (
  <Container>
    <TextInput
      editable={editable}
      value={value}
      onChange={onChange}
      onLayout={onLayout('input')}
      multiline
      ref={setRef('input')}
      inputHeight={inputHeight}
    />
    <Text
      ref={setRef('hidden')}
      onLayout={onLayout('hidden')}
      hiddenWidth={hiddenWidth}
    >
      {text}
    </Text>
  </Container>
);

ExpandingTextInput.defaultProps = {
  editable: true,
};

export default ExpandingTextInput;
