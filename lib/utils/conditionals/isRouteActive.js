// @flow

const isRouteActive = (config, route, key) => {
  const keyConfig = config[key];

  if (!keyConfig) return false;

  const { is, startsWith, includes } = keyConfig;

  if (is && is.includes(route)) return true;

  if (includes) {
    const routeIsActive = includes.find(item => route.includes(item));

    if (routeIsActive) return routeIsActive;
  }

  if (startsWith) {
    const routeIsActive = startsWith.find(item => route.startsWith(item));

    if (routeIsActive) return routeIsActive;
  }

  return false;
};

export default isRouteActive;
