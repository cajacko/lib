// @flow

import * as React from 'react';
import SplashScreen from '../../modules/SplashScreen';
import appLoading from '../../utils/appLoading';
import GenericErrorBoundary from '../GenericErrorBoundary';

type Props = {
  children: React.Node,
};

type State = {
  loading: boolean,
  error: ?*,
};

/**
 * Handle whether to keep the splash screen/loading screen going on launch
 */
class AppLoadingComponent extends React.Component<Props, State> {
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
      loading,
      error,
    };

    if (loading && !error) {
      appLoading
        .getPromise()
        .catch((e) => {
          this.setState({ loading: false, error: e });
        })
        .then(() => {
          this.setState({ loading: false });
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
    // Don't need to show anything when loading, as the splash screen
    // should be showing. The only time it does show
    return (
      <GenericErrorBoundary error={this.state.error}>
        {this.state.loading ? null : this.props.children}
      </GenericErrorBoundary>
    );
  }
}

export default AppLoadingComponent;
