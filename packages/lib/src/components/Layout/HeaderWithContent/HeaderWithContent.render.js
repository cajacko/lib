// @flow

import React, { Fragment } from 'react';
import GenericErrorBoundary from '../../GenericErrorBoundary';
import Header from '../../Header';
import type { Props as HeaderProps } from '../../Header/Header.render';

type Props = {
  header: HeaderProps,
};

/**
 * Render a generic header with some content. We've wrapped the content in
 * an error boundary, so we can still navigate backwards. The error
 * boundary props are passed through
 */
const HeaderWithContent = ({ header, ...props }: Props) => (
  <Fragment>
    <Header {...header} />
    <GenericErrorBoundary {...props} />
  </Fragment>
);

export default HeaderWithContent;
