// @flow

import Subscription from '../modules/Subscription';
import { BLACK } from '../config/styles/colors';

const subscription = new Subscription(
  {
    topColor: BLACK,
    bottomColor: BLACK,
    statusBarColor: BLACK,
    statusBarStyle: 'light-content',
  },
  'object'
);

export default subscription;
