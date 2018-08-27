// @flow

import React from 'react';
import TabNavItem from '../Item';
import { Container } from './Container.style';
import { THEMES } from '../../../config/styles/tabNav';
import ensureObjHasValue from '../../../utils/ensureObjHasVal';
import isRouteActive from '../../../utils/conditionals/isRouteActive';

const isActiveFunc = (item, { isActive, matchActiveTabNav, currentRoute }) => {
  if (isActive) return isActive(item);

  if (!matchActiveTabNav || !currentRoute) return false;

  return isRouteActive(matchActiveTabNav, currentRoute, item.label);
};

const TabNavContainer = ({ items, theme, ...props }) => (
  <Container theme={ensureObjHasValue(THEMES, theme)}>
    {items.map(({ key, ...item }) => (
      <TabNavItem
        key={key}
        theme={theme}
        isActive={isActiveFunc(item, props)}
        {...item}
      />
    ))}
  </Container>
);

TabNavContainer.defaultProps = {
  theme: THEMES.PRIMARY,
};

export default TabNavContainer;
