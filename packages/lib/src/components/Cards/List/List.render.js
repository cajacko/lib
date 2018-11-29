// @flow

import React from 'react';
import { FlatList, SectionList } from '../../UI';

const CardsList = ({ cards, renderSectionHeader, ...props }) =>
  (renderSectionHeader ? (
    <SectionList
      renderSectionHeader={renderSectionHeader}
      sections={cards}
      {...props}
    />
  ) : (
    <FlatList data={cards} {...props} />
  ));

export default CardsList;
