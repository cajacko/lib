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

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ hiddenText: nextProps.value });
    }
  }

  onChange(event) {
    const { text } = event.nativeEvent;

    this.setState({ hiddenText: text });

    if (this.props.onChange) this.props.onChange(text);
  }

  onLayout(type) {
    return (...args) => {
      switch (type) {
        case 'input':
          if (this.props.onLayout) this.props.onLayout(...args);
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
          if (this.props.innerRef) this.props.innerRef(ref);
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
    const props = Object.assign({}, this.props);
    const { backgroundColor } = props;

    delete props.onChange;
    delete props.onLayout;
    delete props.backgroundColor;

    return (
      <ExpandingTextInput
        text={this.state.hiddenText}
        onChange={this.onChange}
        onLayout={this.onLayout}
        setRef={this.setRef}
        inputHeight={this.state.inputHeight}
        hiddenWidth={this.state.hiddenWidth}
        textBackgroundColor={backgroundColor}
        {...props}
      />
    );
  }
}

export default ExpandingTextInputComponent;