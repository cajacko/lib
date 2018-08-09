// @flow

import React from 'react';
import { Container } from './GenericErrorBoundary.style';
import Text from '../Text';
import ButtonsText from '../Buttons/Text';

const GenericErrorBoundary = ({
  errorTitle,
  errorMessage,
  errorAction,
  errorActionText,
  children,
}) =>
  (errorTitle || errorMessage ? (
    <Container>
      {errorTitle && <Text text={errorTitle} />}
      {errorMessage && <Text text={errorMessage} />}
      {errorAction &&
        errorActionText && (
          <ButtonsText action={errorAction} text={errorActionText} />
        )}
    </Container>
  ) : (
    children
  ));

export default GenericErrorBoundary;
