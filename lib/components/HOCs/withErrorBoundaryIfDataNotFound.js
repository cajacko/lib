// @flow

import React from 'react';
import GenericErrorBoundary from '../GenericErrorBoundary';

type Props = {
  dataNotFound?: ?boolean,
};

const withErrorBoundaryIfDataNotFound = (
  CustomComponent,
  error,
  errorMessage
) => (props: Props) => (
  <GenericErrorBoundary
    error={props.dataNotFound && error}
    childProps={props}
    errorMessage={errorMessage}
  >
    <CustomComponent {...props} />
  </GenericErrorBoundary>
);

export default withErrorBoundaryIfDataNotFound;
