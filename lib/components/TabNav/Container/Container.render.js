// @flow

import React from 'react';
import TabNavItem from '../Item';
import { Container } from './Container.style';
import { THEMES } from '../../../config/styles/tabNav';
import ensureObjHasValue from '../../../utils/ensureObjHasVal';

const TabNavContainer = ({ items, theme, isActive }) => (
  <Container theme={ensureObjHasValue(THEMES, theme)}>
    {items.map(({ key, ...item }) => (
      <TabNavItem key={key} theme={theme} isActive={isActive(item)} {...item} />
    ))}
  </Container>
);

TabNavContainer.defaultProps = {
  theme: THEMES.PRIMARY,
};

export default TabNavContainer;
