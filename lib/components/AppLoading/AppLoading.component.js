// @flow

import React, { Component } from 'react';
import SplashScreen from '../../modules/SplashScreen';
import appLoading from '../../utils/appLoading';
import GenericErrorBoundary from '../GenericErrorBoundary';

type Props = {};
type State = {};

/**
 * Handle whether to keep the splash screen/loading screen going on launch
 */
class AppLoadingComponent extends Component<Props, State> {
  /**
   * Initialise the class, set the initial state and bind the methods
   *
   * @param {Object} props The props passed to the component, check flow for
   * more detail
   *
   * @return {Void} No return value
   */
  constructor(props: Props) {
    super(props);

    const loading = !appLoading.isResolved();
    const error = appLoading.isRejected();

    this.state = {
      error,
    };

    if (loading && !error) {
      appLoading
        .getPromise()
        .catch((e) => {
          this.setState({ error: e });
        })
        .then(() => {
          SplashScreen.hide();
        });
    } else {
      SplashScreen.hide();
    }
  }

  /**
   * Render the component
   *
   * @return {ReactElement} Markup to render
   */
  render() {
    return (
      <GenericErrorBoundary error={this.state.error}>
        {this.props.children}
      </GenericErrorBoundary>
    );
  }
}

export default AppLoadingComponent;
