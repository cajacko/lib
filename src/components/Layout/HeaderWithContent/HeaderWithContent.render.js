// @flow

import React, { Fragment } from 'react';
import Header from '../../Header';
import Content from '../../Content';

const HeaderWithContent = ({ header, children }) => (
  <Fragment>
    <Header {...header} />
    <Content>{children}</Content>
  </Fragment>
);

export default HeaderWithContent;
