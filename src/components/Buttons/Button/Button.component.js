import React, { Component } from "react";
import ButtonsButton from "./Button.render";

class ButtonsButtonComponent extends Component {
  constructor(props) {
    super(props);

    this.action = this.action.bind(this);
  }

  action(event) {
    if (event.preventDefault) event.preventDefault();

    this.props.action(event);
  }

  render() {
    const props = Object.assign({}, this.props);

    delete props.action;

    return <ButtonsButton action={this.action} {...props} />;
  }
}

export default ButtonsButtonComponent;
