// @flow

import React from 'react';
import {
  Container,
  Inner,
  Button as ButtonContainer,
  BottomMargin,
  BACKGROUND_COLOR,
} from './GenericErrorBoundary.style';
import Text from '../Text';
import Button from '../Button';
import buttons from '../../config/styles/buttons';
import marketingCopy from '../../utils/marketingCopy';

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
            <Text
              text={errorTitle}
              type="h5"
              center
              backgroundColor={BACKGROUND_COLOR}
            />
          </BottomMargin>
        )}

        {errorMessage && (
          <BottomMargin hasMargin={messageHasMargin}>
            <Text
              text={errorMessage}
              center
              backgroundColor={BACKGROUND_COLOR}
            />
          </BottomMargin>
        )}

        {errorCode && (
          <BottomMargin hasMargin={codeHasMargin}>
            <Text
              text={{
                _textFromConst: `${marketingCopy.get('GenericErrorBoundary.ErrorCode')}: ${errorCode}`,
              }}
              type="overline"
              center
              backgroundColor={BACKGROUND_COLOR}
            />
          </BottomMargin>
        )}

        {showButton && (
          <ButtonContainer>
            <Button
              action={errorAction}
              text={errorActionText}
              type={buttons.CONTAINED.PRIMARY}
            />
          </ButtonContainer>
        )}
      </Inner>
    </Container>
  ) : (
    children || null
  );
};

export default GenericErrorBoundary;
