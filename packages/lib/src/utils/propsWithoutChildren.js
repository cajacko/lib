// @flow

import AppError from '../modules/AppError';

const propsWithoutChildren = (props) => {
  if (!props || typeof props !== 'object') {
    throw new AppError('Invalid props passed to propsWithoutChildren');
  }

  const newProps = Object.assign({}, props);

  delete newProps.children;

  return newProps;
};

export default propsWithoutChildren;
