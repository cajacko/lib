// @flow

const withCache = (func, cacheKeyIndex, cacheKeyFunc) => {
  const cache = {};

  return (...args) => {
    let cacheKey;

    if (cacheKeyFunc) {
      cacheKey = cacheKeyFunc(...args);
    } else if (typeof cacheKeyIndex === 'number') {
      cacheKey = args[cacheKeyIndex];
    }

    if (cacheKey) {
      if (Object.keys(cache).includes(cacheKey)) {
        return cache[cacheKey];
      }
    }

    const val = func(...args);

    if (cacheKey) {
      cache[cacheKey] = val;
    }

    return val;
  };
};

export default withCache;
