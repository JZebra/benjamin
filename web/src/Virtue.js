import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { _fetch } from './utils';

@observer
export default class Virtue extends Component {

  handleSuccess() {
    // TODO: pass the value in the click handler
    this.handleClick(1)
  }

  handleFail() {
    this.handleClick(0)
  }

  handleClick(value) {
    let payload = {
      value: value,
      virtue_id: this.props.virtue.id,
    }

    _fetch('api/virtue_entries/', 'POST', payload)
    .then(res => {
      return res.json()
    }).then(json => {
      console.log(json)
    })
  }

  render() {
    const virtue = this.props.virtue;

    return (
      <div className="Virtue col-6" onClick={ this.handleClick.bind(this) }>
        <h1 className="Virtue-title">{ virtue.title }</h1>
        <p className="Virtue-quote">{ virtue.quote }</p>
        <button className="btn btn-success" onClick={ this.handleSuccess.bind(this) }>Yes</button>
        <button className="btn btn-danger" onClick={ this.handleFail.bind(this) }>No</button>
      </div>
    );
  }
}

