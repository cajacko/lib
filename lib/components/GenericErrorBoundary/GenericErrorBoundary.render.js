// @flow

import React from 'react';
import {
  Container,
  Inner,
  Button as ButtonContainer,
  BottomMargin,
} from './GenericErrorBoundary.style';
import Text from '../Text';
import Button from '../Buttons';

const GenericErrorBoundary = ({
  errorCode,
  errorTitle,
  errorMessage,
  errorAction,
  errorActionText,
  children,
}) => {
  const showButton = errorAction && errorActionText;
  const titleHasMargin = errorMessage || errorCode || showButton;
  const messageHasMargin = errorCode || showButton;
  const codeHasMargin = showButton;

  return errorTitle || errorMessage ? (
    <Container>
      <Inner>
        {errorTitle && (
          <BottomMargin hasMargin={titleHasMargin}>
            <Text text={errorTitle} type="h5" center />
          </BottomMargin>
        )}

        {errorMessage && (
          <BottomMargin hasMargin={messageHasMargin}>
            <Text text={errorMessage} center />
          </BottomMargin>
        )}

        {errorCode && (
          <BottomMargin hasMargin={codeHasMargin}>
            <Text text={`Error Code: ${errorCode}`} type="overline" center />
          </BottomMargin>
        )}

        {showButton && (
          <ButtonContainer>
            <Button
              action={errorAction}
              text={errorActionText}
              type="CONTAINED"
              theme="PRIMARY"
            />
          </ButtonContainer>
        )}
      </Inner>
    </Container>
  ) : (
    children
  );
};

export default GenericErrorBoundary;
