// @flow

import * as React from 'react';
import { BackHandler } from 'react-native';
import withRouter from '../HOCs/withRouter';

type Props = {
  children: React.Node,
  history: {
    index: number,
    goBack: () => {},
  },
};

/**
 * Handle the Android back button
 */
class AndroidBackButton extends React.Component<Props> {
  /**
   * Initialise the class and bind the methods
   *
   * @param {Object} props The props passed to the component
   *
   * @return {Void} No return value
   */
  constructor(props) {
    super(props);

    (this: any).handleBack = this.handleBack.bind(this);
  }

  /**
   * When the component mounts, register the bak button listener
   *
   * @return {Void} no return value
   */
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  /**
   * When the component unmounts, remove the listener
   *
   * @return {Void} No return value
   */
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  /**
   * When the Android back button is pressed, go back in the history, or return
   * the the home screen
   *
   * @return {Boolean} Whether we are using the back button or not
   */
  handleBack() {
    const { history } = this.props;

    if (history.index === 0) {
      return false; // home screen
    }

    history.goBack();

    return true;
  }

  /**
   * Render the children, or nothing
   *
   * @return {ReactElement} The markup to render
   */
  render() {
    return this.props.children || null;
  }
}

export default withRouter(AndroidBackButton);
