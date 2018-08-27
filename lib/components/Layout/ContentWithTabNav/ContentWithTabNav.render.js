// @flow

import React, { Fragment } from 'react';
import TabNav from '../../TabNav';
import { Content } from './ContentWithTabNav.style';

const ContentWithTabNav = ({ tabNav, children }) => (
  <Fragment>
    <Content>{children}</Content>
    <TabNav {...tabNav} />
  </Fragment>
);

export default ContentWithTabNav;
