// @flow

import React, { Component } from 'react';

class Button extends Component {
  render(): React$Element<any> {
    return (
        <div
            className="Button"
            onClick={() => this.props.onClick()}>
            {this.props.value}
        </div>
    );
  }
}

export default Button;
