// @flow

import React, { Component } from 'react';
import ExpandingTextInput from '../../ExpandingTextInput';

/**
 * Business logic for the TextArea component.
 */
class TextAreaComponent extends Component {
  /**
   * Initialise the class, set the initial state and bind the methods
   *
   * @param {Object} props The props passed to the component, check flow for
   * more detail
   *
   * @return {Void} No return value
   */
  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.autoFocus && !prevProps.autoFocus && this.input) {
      this.input.focus();
    }
  }

  setRef(ref) {
    this.input = ref;
  }

  /**
   * Render the component
   *
   * @return {ReactElement} Markup to render
   */
  render() {
    return <ExpandingTextInput innerRef={this.setRef} {...this.props} />;
  }
}

export default TextAreaComponent;
