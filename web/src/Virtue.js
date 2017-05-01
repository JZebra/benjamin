// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import VirtueStar from './VirtueStar';

@observer
export default class Virtue extends Component {

  handleSuccess(): void {
    // TODO: pass the value in the click handler
    this.handleClick(1)
  }

  handleFail(): void {
    this.handleClick(0)
  }

  handleClick(value: number): void {
    const date = this.props.appStore.selectedDay;
    const virtueId = this.props.virtue.id;

    this.props.appStore.recordVirtueEntry(date, value, virtueId);
  }

  renderStar(): Object {
    return (
      <VirtueStar
        appStore={ this.props.appStore }
        virtueId={ this.props.virtue.id }
      />
    )
  }

  render(): React$Element<any> {
    const virtue = this.props.virtue;

    return (
      <div className="Virtue col-6">
        <h1 className="Virtue-title">{ virtue.title }</h1>
        <p className="Virtue-quote">{ virtue.quote }</p>
        <button className="btn btn-success" onClick={ this.handleSuccess.bind(this) }>Yes</button>
        <button className="btn btn-danger" onClick={ this.handleFail.bind(this) }>No</button>
        { this.renderStar() }
      </div>
    );
  }
}

