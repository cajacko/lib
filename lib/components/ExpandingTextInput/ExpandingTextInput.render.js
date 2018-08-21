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
  onLayout,
  setRef,
  hiddenWidth,
  text,
  ...props
}) => (
  <Container>
    <TextInput
      onLayout={onLayout('input')}
      multiline
      innerRef={setRef('input')}
      underlineColorAndroid="transparent"
      {...props}
    />
    <Text
      innerRef={setRef('hidden')}
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
