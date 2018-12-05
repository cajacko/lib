// @flow

// Loosely follows https://gist.github.com/bleonard/f7d748e89ad2a485ec34

import React, { Component } from 'react';
import ExpandingTextInput from './ExpandingTextInput.render';
import { LINE_BREAKS } from '../../config/regex';

type Ref = {
  focus: () => void,
};

type LayoutEvent = {
  nativeEvent: {
    layout: {
      width: number,
      height: number,
    },
  },
};

type LayoutArgs = Array<LayoutEvent>;

type Props = {
  value: string,
  onChange?: string => void,
  onLayout?: (...LayoutArgs) => void,
  innerRef?: (?Ref) => void,
  disableNewLines?: boolean,
  onReturnKey?: string => void,
};

type State = {
  hiddenText: string,
  hiddenWidth: number,
  inputHeight: number,
};

/**
 * Business logic for the expanding text input, syncs the text input with a text
 * component to get it's height and set that back to the input
 */
class ExpandingTextInputC extends Component<Props, State> {
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

    this.state = {
      inputHeight: 500,
      hiddenWidth: 200,
      hiddenText: props.value,
    };

    (this: any).onChange = this.onChange.bind(this);
    (this: any).setRef = this.setRef.bind(this);
    (this: any).onLayout = this.onLayout.bind(this);
  }

  /**
   * When we get the next props update the hidden text if it has changed
   */
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.setState({ hiddenText: nextProps.value });
    }
  }

  /**
   * When the text changes, update the hidden text and pass the text upwards
   */
  onChange(event: { nativeEvent: { text: string } }) {
    let { text } = event.nativeEvent;

    if (this.props.disableNewLines) {
      text = text.replace(LINE_BREAKS, '');
    }

    if (!!text.match(LINE_BREAKS) && this.props.onReturnKey) {
      this.props.onReturnKey(text);
    }

    if (text === this.state.hiddenText) return;

    this.setState({ hiddenText: text });

    if (this.props.onChange) {
      this.props.onChange(text);
    }
  }

  /**
   * When the component does it's layout, process the input and hidden
   * input layout
   */
  onLayout(type: string) {
    return (...args: LayoutArgs) => {
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

  /**
   * When the input is laid out, grab the width and set it for the hidden
   * width, we'll keep this matched and use the hidden input to figure
   * out the height
   */
  onInputLayout(event: LayoutEvent) {
    const hiddenWidth = event.nativeEvent.layout.width;

    if (this.state.hiddenWidth !== hiddenWidth) {
      this.setState({ hiddenWidth });
    }
  }

  /**
   * When the hidden input is laid out, grab the height of it. We'll use this
   * to set the main input height. As it's the same width, this should be
   * accurate. We also set a minimum height on it.
   */
  onHiddenLayout(event: LayoutEvent) {
    let inputHeight = event.nativeEvent.layout.height;

    if (inputHeight < 50) {
      inputHeight = 50;
    }

    if (this.state.inputHeight !== inputHeight) {
      this.setState({ inputHeight });
    }
  }

  /**
   * Get the input and hidden input refs for later, and pass up if necessary
   */
  setRef(type: string) {
    return (ref: ?Ref) => {
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

  input: ?Ref;
  hidden: ?Ref;

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
    delete props.onReturnKey;

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

export default ExpandingTextInputC;
