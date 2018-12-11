// @flow

import React, { Component } from 'react';
import withTextInput from '../../HOCs/withTextInput';
import { TextInput } from './TextInput.style';

type Props = {
  autoFocus?: boolean,
};

const defaultProps = {
  autoFocus: false,
};

type Ref = {
  focus: () => void,
};

type State = {};

/**
 * Business logic for the text input
 */
class TextInputComponent extends Component<Props, State> {
  static defaultProps: Props;

  /**
   * Initialise the class, set the initial state and bind the methods
   */
  constructor(props: Props) {
    super(props);

    this.state = {};

    (this: any).setRef = this.setRef.bind(this);
  }

  /**
   * When the component updates, see if we should focus on it
   */
  componentDidUpdate(prevProps: Props) {
    if (this.props.autoFocus && !prevProps.autoFocus && this.input) {
      this.input.focus();
    }
  }

  /**
   * Grab the input ref so we can focus on it
   */
  setRef(ref: ?Ref) {
    this.input = ref;
  }

  input: ?Ref;

  /**
   * Render the component
   */
  render() {
    // We're using the customStyles prop in the container, as we don't
    // want to conflict with native supported props. This can happen
    // sometimes if you use a key that is also a layout prop. This can
    // cause Android to crash.
    const {
      backgroundColor, error, type, ...props
    } = this.props;

    return (
      <TextInput customProps={{ backgroundColor, error, type }} {...props} />
    );
  }
}

TextInputComponent.defaultProps = defaultProps;

export default withTextInput(TextInputComponent);
