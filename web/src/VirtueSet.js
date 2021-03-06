// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Virtue from './Virtue';


// props: title

@observer
export default class VirtueSet extends Component {

  handleClick(): void {
    this.isExpanded()
      ? this.props.viewStore.collapseVirtueSet(this.props.id)
      : this.props.viewStore.expandVirtueSet(this.props.id);
  }

  isExpanded(): boolean {
    return this.props.viewStore.expandedVirtueSets.includes(this.props.id);
  }

  renderVirtues(): ?Object {
    const appStore = this.props.appStore;
    const viewStore = this.props.viewStore;

    if (this.props.viewStore.expandedVirtueSets.includes(this.props.id)) {
      return this.props.virtueSet.virtues.map((virtue) => {
        return <Virtue
          appStore={ appStore }
          viewStore={ viewStore }
          virtue={ virtue } />
      });
    }
  }

  render(): React$Element<any> {
    return (
      <div className='VirtueSet'>
        <h1 onClick={this.handleClick.bind(this)}>{this.props.virtueSet.title}</h1>
        <h2>{ this.props.appStore.selectedDay }</h2>
        <div className="VirtueSet-list row">
          { this.renderVirtues() }
        </div>
      </div>
    );
  }
}

