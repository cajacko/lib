// @flow

import React from 'react';
import {
  SafeAreaView as RNSafeAreaView,
  StatusBar as RNStatusBar,
} from 'react-native';
import {
  Container,
  Background,
  Part,
  ForeGround,
  Inner,
  StatusBar,
} from './SafeAreaView.style';
import isPlatform from '../../utils/conditionals/isPlatform';

const SafeAreaView = ({
  children,
  topColor,
  bottomColor,
  statusBarColor,
  statusBarStyle,
}) => (
  <Container>
    <RNStatusBar
      backgroundColor={statusBarColor || topColor}
      barStyle={statusBarStyle}
    />
    {isPlatform('android')
      ? [
        <StatusBar key="statusBar" backgroundColor={topColor} />,
        <Inner key="inner">{children}</Inner>,
        ]
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

export default SafeAreaView;
