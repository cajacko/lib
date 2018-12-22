// @flow

import React, { Component } from 'react';
import Spacer from 'react-native-keyboard-spacer';
import SafeArea from 'react-native-safe-area';
import isPlatform from '../../utils/conditionals/isPlatform';

let safeAreaInsets = {
  init: true,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const listeners = {};

/**
 * Add a listener to the safe area insets
 */
const add = (cb) => {
  listeners[cb] = cb;

  return () => {
    delete listeners[cb];
  };
};

/**
 * Call each listener
 */
const broadCast = (...args) => {
  Object.values(listeners).forEach((cb) => {
    cb(...args);
  });
};

/**
 * Set the new safe area insets and broadcast to all listeners
 */
const set = (result) => {
  ({ safeAreaInsets } = result);
  broadCast(safeAreaInsets);
};

SafeArea.getSafeAreaInsetsForRootView().then(set);

SafeArea.addEventListener('safeAreaInsetsForRootViewDidChange', set);

type Props = {};

type State = {
  init?: boolean,
  top: number,
  left: number,
  bottom: number,
  right: number,
};

/**
 * Allow space for the keyboard. Android doesn't seem to need it.
 * Maybe because the way we do SafeAreaView?
 */
class KeyboardSpacer extends Component<Props, State> {
  /**
   * Set the initial state and unsubscribe method
   */
  constructor(props: Props) {
    super(props);

    this.state = safeAreaInsets;

    this.unsubscribe = null;
  }

  /**
   * When the component mounts, listen to the inset changes
   */
  componentDidMount() {
    this.unsubscribe = add((state) => {
      this.setState(state);
    });
  }

  /**
   * When the component unmounts, remove the event listener
   */
  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  unsubscribe: ?() => void;

  /**
   * Display the keyboard spacer, or null on Android. Removes a bit of
   * spacing on iPhone x like devices
   */
  render() {
    return isPlatform('android') ? null : (
      <Spacer topSpacing={-this.state.bottom} />
    );
  }
}

export default KeyboardSpacer;
