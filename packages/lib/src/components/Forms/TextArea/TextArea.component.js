// @flow

import React, { Component } from 'react';
import ExpandingTextInput from '../../ExpandingTextInput';
import { BACKGROUND_COLORS } from '../../../config/styles/textIconColors';
import withText from '../../HOCs/withText';

type Props = {
  autoFocus?: boolean,
};

type Ref = {
  focus: () => void,
};

/**
 * Business logic for the TextArea component.
 */
class TextAreaComponent extends Component<Props> {
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

    (this: any).setRef = this.setRef.bind(this);
  }

  /**
   * When the component updates, see if we should focus
   */
  componentDidUpdate(prevProps: Props) {
    if (this.props.autoFocus && !prevProps.autoFocus && this.input) {
      this.input.focus();
    }
  }

  /**
   * Grab the ref to focus on later
   */
  setRef(ref: ?Ref) {
    this.input = ref;
  }

  input: ?Ref;

  /**
   * Render the component
   *
   * @return {ReactElement} Markup to render
   */
  render() {
    return (
      <ExpandingTextInput
        innerRef={this.setRef}
        backgroundColor={BACKGROUND_COLORS.WHITE}
        {...this.props}
      />
    );
  }
}

export default withText('placeholder')(TextAreaComponent);
