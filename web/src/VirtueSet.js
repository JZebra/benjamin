import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Virtue from './Virtue';


// props: title

@observer
export default class VirtueSet extends Component {

  handleClick() {
    this.isExpanded()
      ? this.props.viewStore.collapseVirtueSet(this.props.id)
      : this.props.viewStore.expandVirtueSet(this.props.id);
  }

  isExpanded() {
    return this.props.viewStore.expandedVirtueSets.includes(this.props.id);
  }

  renderVirtues() {
    if (this.props.viewStore.expandedVirtueSets.includes(this.props.id)) {
      const virtues = this.props.virtueSet.virtues.map((virtue) => {
        return <Virtue virtue={ virtue } />
      });
      return virtues;
    }
  }

  render() {
    return (
      <div className='VirtueSet'>
        <h1 onClick={this.handleClick.bind(this)}>{this.props.virtueSet.title}</h1>
        <div className="VirtueSet-list row">
          { this.renderVirtues() }
        </div>
      </div>
    );
  }
}
