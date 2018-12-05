// @flow

import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import withText from './withText';
import { LINE_BREAKS } from '../../config/regex';

type OnChangeArgs = Array<string>;

type Props = {
  value: string,
  submitOnReturn?: boolean,
  onChange?: (...OnChangeArgs) => void,
  onSubmitEditing?: string => void,
  onSubmit?: string => void,
};

/**
 * Common wrappers around anything that uses a text input, like submit
 * on return key
 */
const withTextInput = (CustomComponent: *) => {
  /**
   * The actual component
   */
  class TextInput extends Component<Props> {
    /**
     * Initialise the class and bind the methods
     */
    constructor(props: Props) {
      super(props);

      this.text = props.value;

      (this: any).onSubmit = this.onSubmit.bind(this);
      (this: any).onChange = this.onChange.bind(this);
      (this: any).onReturnKey = this.onReturnKey.bind(this);
    }

    /**
     * When the text changes, store a ref to it, callback the onChange
     * handler and seeif we should submit on the return key
     */
    onChange(...args: OnChangeArgs) {
      const [text] = args;
      this.text = text;

      if (this.props.submitOnReturn && !!text.match(LINE_BREAKS)) {
        this.onSubmit();
        return;
      }

      if (this.props.onChange) this.props.onChange(...args);
    }

    /**
     * When the return key is pressed see if we should submit
     */
    onReturnKey() {
      if (this.props.submitOnReturn) {
        this.onSubmit();
      }
    }

    /**
     * Call the submit handlers
     */
    onSubmit() {
      if (this.props.onSubmitEditing) this.props.onSubmitEditing(this.text);
      if (this.props.onSubmit) this.props.onSubmit(this.text);
    }

    text: string;

    /**
     * Render the component
     */
    render() {
      const props = cloneDeep(this.props);

      delete props.onSubmitEditing;
      delete props.onSubmit;

      return (
        <CustomComponent
          onSubmitEditing={this.onSubmit}
          {...props}
          onReturnKey={this.onReturnKey}
        />
      );
    }
  }

  return withText('placeholder')(TextInput);
};

export default withTextInput;
