// @flow

// Loosely follows https://gist.github.com/bleonard/f7d748e89ad2a485ec34

import React, { Component } from 'react';
import ExpandingTextInput from './ExpandingTextInput.render';

/**
 * Business logic for the expanding text input, syncs the text input with a text
 * component to get it's height and set that back to the input
 */
class ExpandingTextInputComponent extends Component {
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

    this.state = {
      inputHeight: 500,
      hiddenWidth: 200,
      hiddenText: props.value,
    };

    this.onChange = this.onChange.bind(this);
    this.setRef = this.setRef.bind(this);
    this.onLayout = this.onLayout.bind(this);
  }

  // setNativeProps(nativeProps) {
  //   var input  = this.input;
  //   var hidden = this.hidden;

  //   input.setNativeProps(nativeProps);
  //   hidden.setNativeProps(nativeProps);

  //   if (nativeProps.hiddenText !== undefined) {
  //     this.state.hiddenText = nativeProps.text;
  //   }
  // }

  onChange(event) {
    const { text } = event.nativeEvent;

    this.setState({ hiddenText: text });

    if (this.props.onChange) this.props.onChange(text);
  }

  onLayout(type) {
    return (...args) => {
      switch (type) {
        case 'input':
          return this.onInputLayout(...args);
        case 'hidden':
          return this.onHiddenLayout(...args);
        default:
          return null;
      }
    };
  }

  onInputLayout(event) {
    const hiddenWidth = event.nativeEvent.layout.width;

    if (this.state.hiddenWidth !== hiddenWidth) {
      this.setState({ hiddenWidth });
    }
  }

  onHiddenLayout(event) {
    let inputHeight = event.nativeEvent.layout.height;

    if (inputHeight < 50) {
      inputHeight = 50;
    }

    if (this.state.inputHeight !== inputHeight) {
      this.setState({ inputHeight });
    }
  }

  setRef(type) {
    return (ref) => {
      switch (type) {
        case 'input':
          this.input = ref;
          break;
        case 'hidden':
          this.hidden = ref;
          break;
        default:
          break;
      }
    };
  }

  /**
   * Render the component
   *
   * @return {ReactElement} Markup to render
   */
  render() {
    return (
      <ExpandingTextInput
        value={this.props.value}
        text={this.state.hiddenText}
        onChange={this.onChange}
        onLayout={this.onLayout}
        setRef={this.setRef}
        inputHeight={this.state.inputHeight}
        hiddenWidth={this.state.hiddenWidth}
      />
    );
  }
}

export default ExpandingTextInputComponent;
