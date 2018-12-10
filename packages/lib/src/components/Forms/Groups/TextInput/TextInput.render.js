// @flow

import React from 'react';
import styled from 'styled-components';
import { Div } from '../../../UI';
import Text from '../../../Text';
import TextInput from '../../TextInput';
import { TYPES } from '../../../../config/styles/text';
import { BACKGROUND_COLORS } from '../../../../config/styles/textIconColors';

const labelType = 'caption';
const errorType = 'caption';
const padding = 30;

const backgroundColor = BACKGROUND_COLORS.WHITE;
const labelOffset = TYPES[labelType].size / 2;
const errorOffset = 5;
const errorAllowance = errorOffset + TYPES[errorType].size + 5;

const shouldOverlayLabel = (label, value) => !!label && !!value && value !== '';

const containerPadding = ({ paddingBottom, paddingTop, paddingVertical }) => {
  let top = 0;
  let bottom = errorAllowance;

  if (paddingVertical) {
    top = padding;
    bottom += padding;
  } else {
    if (paddingBottom) {
      bottom += padding;
    }

    if (paddingTop) {
      top = padding;
    }
  }

  return `
    ${top ? `padding-top: ${top};` : ''}
    padding-bottom: ${bottom};
  `;
};

const Container = styled(Div)`
  width: 300;
  ${containerPadding};
`;

const Inner = styled(Div)`
  position: relative;
`;

const Label = styled(Div)`
  top: -${labelOffset};
  left: 10;
  position: absolute;
  background-color: ${backgroundColor};
  z-index: 2;
  padding-horizontal: 5;
`;

const Error = styled(Div)`
  position: absolute;
  padding-top: ${errorOffset};
`;

const Input = styled(Div)`
  position: relative;
  z-index: 1;
`;

const ErrorContainer = styled(Div)`
  position: relative;
`;

/**
 *
 */
const TextInputGroup = ({
  label,
  error,
  value,
  paddingBottom,
  paddingVertical,
  paddingTop,
  ...props
}) => (
  <Container
    paddingBottom={paddingBottom}
    paddingVertical={paddingVertical}
    paddingTop={paddingTop}
  >
    <Inner>
      {shouldOverlayLabel(label, value) && (
        <Label>
          <Text
            type={labelType}
            text={label}
            backgroundColor={backgroundColor}
            error={!!error}
          />
        </Label>
      )}
      <Input>
        <TextInput
          backgroundColor={backgroundColor}
          value={value}
          placeholder={label}
          error={!!error}
          {...props}
        />
      </Input>
      {error && (
        <ErrorContainer>
          <Error>
            <Text
              type={errorType}
              text={error}
              backgroundColor={backgroundColor}
              error
            />
          </Error>
        </ErrorContainer>
      )}
    </Inner>
  </Container>
);

export default TextInputGroup;
