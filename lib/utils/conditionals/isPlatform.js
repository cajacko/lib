// @flow

import { Platform } from 'react-native';

const isPlatform = (...platforms) => platforms.includes(Platform.OS);

export default isPlatform;
