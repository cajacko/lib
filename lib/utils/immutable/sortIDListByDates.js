// @flow

const sortIDListByDates = (list, idMap, dateProps, reverse = false) => {
  const getDatePropByID = (id, prop) => new Date(idMap.getIn([id, prop]));

  return list.sort((a, b) => {
    const sortBy = (i = 0, prev = 0) => {
      const prop = dateProps[i];

      if (!prop) return prev;

      const dateA = getDatePropByID(a, prop);
      const dateB = getDatePropByID(b, prop);

      const diff = reverse ? dateA - dateB : dateB - dateA;

      if (diff === 0) return sortBy(i + 1, diff);

      return diff;
    };

    return sortBy();
  });
};

export default sortIDListByDates;
