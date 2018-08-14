// @flow

const sortByDates = (dateProps, reverse) => (a, b) => {
  const sortBy = (i = 0, prev = 0) => {
    const prop = dateProps[i];

    if (!prop) return prev;

    const dateA = new Date(a.get(prop));
    const dateB = new Date(b.get(prop));

    const diff = reverse ? dateA - dateB : dateB - dateA;

    if (diff === 0) return sortBy(i + 1, diff);

    return diff;
  };

  return sortBy();
};

export default sortByDates;
