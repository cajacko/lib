// @flow

import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import Spinner from './Spinner.render';

type Props = {};

type State = {
  rotation: *,
};

/**
 * Handle the animation for the spinner
 */
class SpinnerComponent extends Component<Props, State> {
  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      rotation: new Animated.Value(0),
    };

    (this: any).runAnimation = this.runAnimation.bind(this);
  }

  /**
   * On mount start the animation
   */
  componentDidMount() {
    this.runAnimation();
  }

  /**
   * Loop the animation
   */
  runAnimation() {
    this.state.rotation.setValue(1);

    Animated.timing(this.state.rotation, {
      toValue: 0,
      duration: 1200,
      easing: Easing.linear,
    }).start(() => this.runAnimation());
  }

  /**
   * Render the component
   */
  render() {
    const rotation = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return <Spinner {...this.props} rotation={rotation} />;
  }
}

export default SpinnerComponent;
