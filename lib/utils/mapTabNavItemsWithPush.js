// @flow

const mapTabNavItemsWithPush = (tabNavItems, push) =>
  tabNavItems.map((tabNavItem) => {
    const newObject = Object.assign({}, tabNavItem);

    newObject.action = () => push(tabNavItem.route);

    delete newObject.route;

    return newObject;
  });

export default mapTabNavItemsWithPush;
