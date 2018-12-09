// @flow

import React, { Fragment } from 'react';
import GenericErrorBoundary from '../../GenericErrorBoundary';
import Content from '../../Content';
import Header from '../../Header';
import type { Props as HeaderProps } from '../../Header/Header.render';

type Props = {
  header: HeaderProps,
  hasPadding?: boolean,
};

const defaultProps = {
  hasPadding: false,
};

/**
 * Render a generic header with some content. We've wrapped the content in
 * an error boundary, so we can still navigate backwards. The error
 * boundary props are passed through
 */
const HeaderWithContent = ({ hasPadding, header, ...props }: Props) => (
  <Fragment>
    <Header {...header} />
    {hasPadding ? (
      <Content>
        <GenericErrorBoundary {...props} />
      </Content>
    ) : (
      <GenericErrorBoundary {...props} />
    )}
  </Fragment>
);

HeaderWithContent.defaultProps = defaultProps;

export default HeaderWithContent;
