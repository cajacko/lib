// @flow

const Icon = ({ icon, ...props }) => typeof icon === 'function' && icon(props);

export default Icon;
