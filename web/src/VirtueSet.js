// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Virtue from './Virtue';


@observer
export default class VirtueSet extends Component {

  renderVirtues(): ?Object {
    const appStore = this.props.appStore;
    const viewStore = this.props.viewStore;

    return appStore.virtues.map((virtue) => {
      return <Virtue
        key={ virtue.id }
        appStore={ appStore }
        viewStore={ viewStore }
        virtue={ virtue } />
    });
  }

  render(): React$Element<any> {
    const style = {
      'listStyle': 'none',
      'backgroundColor': 'lightgreen',
      'margin': '0 25% 0 25%'
    };

    return (
      <div className='VirtueSet container-fluid' style={ style }>
        <h1>The Thirteen Virtues</h1>
        <h2>{ this.props.appStore.selectedDay }</h2>
        <div className="VirtueSet-list row">
          { this.renderVirtues() }
        </div>
      </div>
    );
  }
}

