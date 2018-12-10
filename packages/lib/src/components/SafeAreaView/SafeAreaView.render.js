// @flow

import * as React from 'react';
import {
  SafeAreaView as RNSafeAreaView,
  StatusBar as RNStatusBar,
} from 'react-native';
import * as colours from '../../config/styles/colors';
import {
  Container,
  Background,
  Part,
  ForeGround,
  Inner,
} from './SafeAreaView.style';
import isPlatform from '../../utils/conditionals/isPlatform';

type Props = {
  children: React.Node,
  topColor?: $Keys<typeof colours>,
  bottomColor?: $Keys<typeof colours>,
  statusBarColor?: $Keys<typeof colours>,
  statusBarStyle?: 'default' | 'light-content' | 'dark-content',
};

const defaultProps = {
  statusBarStyle: 'light-content',
  topColor: colours.BLACK,
  bottomColor: colours.BLACK,
  statusBarColor: colours.BLACK,
};

/**
 * Wrap the children in the full visible area on the device. Taking into
 * account the status bar at the top, and any bottom areas, like on iPhone x
 *
 * Also manages the colours for the top and bottom areas
 */
const SafeAreaView = ({
  children,
  topColor,
  bottomColor,
  statusBarColor,
  statusBarStyle,
}: Props) => (
  <Container>
    <RNStatusBar
      backgroundColor={statusBarColor || topColor}
      barStyle={statusBarStyle}
    />
    {isPlatform('android')
      ? [<Inner key="inner">{children}</Inner>]
      : [
        <ForeGround key="foreground">
          <RNSafeAreaView style={{ flex: 1 }}>
            <Inner>{children}</Inner>
          </RNSafeAreaView>
        </ForeGround>,
        <Background key="background">
          <Part color={topColor} />
          <Part color={bottomColor} />
        </Background>,
        ]}
  </Container>
);

SafeAreaView.defaultProps = defaultProps;

export default SafeAreaView;
