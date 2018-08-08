// @flow

import React from 'react';
import { SafeAreaView as RNSafeAreaView, StatusBar } from 'react-native';
import {
  Container,
  Background,
  Part,
  ForeGround,
  Inner,
} from './SafeAreaView.style';

const SafeAreaView = ({
  children,
  topColor,
  bottomColor,
  statusBarColor,
  statusBarStyle,
}) => (
  <Container>
    <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
    <ForeGround>
      <RNSafeAreaView style={{ flex: 1 }}>
        <Inner>{children}</Inner>
      </RNSafeAreaView>
    </ForeGround>
    <Background>
      <Part color={topColor} />
      <Part color={bottomColor} />
    </Background>
  </Container>
);

export default SafeAreaView;
