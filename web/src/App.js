import React, { Component } from 'react';
import { observer } from 'mobx-react'

import ChainViewContainer from './ChainViewContainer';
import VirtueSetList from './VirtueSetList';
import { _fetch } from './utils';

@observer
export default class App extends Component {
  getVirtueSets() {
    _fetch('api/virtue_sets/').then((res) => {
      return res.json();
    }).then((json) => {
      return json['results'];
    }).then((virtueSets) => {
      this.props.appStore.storeVirtueSets(virtueSets);
    });
  }

  componentDidMount() {
    this.getVirtueSets();
  }

  renderChainView() {
    const viewStore = this.props.viewStore;
    const appStore = this.props.appStore;

    return (
      <ChainViewContainer
        appStore={ appStore }
        viewStore={ viewStore }
      />
    )
  }

  renderDayView() {
    return (
      <div />
      //<DayViewContainer />
    )
  }

  renderVirtueSetList() {
    const viewStore = this.props.viewStore;
    const virtueSets = this.props.appStore.virtueSets;

    return (
        <VirtueSetList
          virtueSets={virtueSets}
          viewStore={viewStore}
        />
      )
  }

  render() {
    if (this.props.viewStore.currentView.chainView) {
      return (
        <div>
          { this.renderChainView() }
        </div>
      )
    } else if (this.props.viewStore.currentView.dayView) {
      return (
        <div>
          { this.renderVirtueSetList() }
        </div>
      );
    }
  }
}
