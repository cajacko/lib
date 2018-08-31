// @flow

import React, { Component } from 'react';
import SafeAreaView from './SafeAreaView.render';
import safeAreaViewSubscriptions from '../../utils/safeAreaViewSubscriptions';

class SafeAreaViewComponent extends Component {
  constructor(props) {
    super(props);

    this.state = safeAreaViewSubscriptions.get();
  }

  componentDidMount() {
    safeAreaViewSubscriptions.subscribe(this.subscription);
  }

  componentWillUnmount() {
    safeAreaViewSubscriptions.unsubscribe(this.subscription);
  }

  subscription(values) {
    this.setState(values);
  }

  render() {
    return <SafeAreaView {...this.state} {...this.props} />;
  }
}

export default SafeAreaViewComponent;
