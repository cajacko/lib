// @flow

import React from 'react';
import Spacer from 'react-native-keyboard-spacer';
import isPlatform from '../../utils/conditionals/isPlatform';

/**
 * Allow space for the keyboard. Android doesn't seem to need it.
 * Maybe because the way we do SafeAreaView?
 */
const KeyboardSpacer = () => (isPlatform('android') ? null : <Spacer />);

export default KeyboardSpacer;
