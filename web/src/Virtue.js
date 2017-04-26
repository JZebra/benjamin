import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { _fetch } from './utils';

@observer
export default class Virtue extends Component {

  handleClick() {
    let payload = {
      value: 1,
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
      </div>
    );
  }
}
