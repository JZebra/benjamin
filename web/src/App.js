import React, { Component } from 'react';
import { observer } from 'mobx-react'

import './App.css';
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
      this.props.store.storeVirtueSets(virtueSets);
    });
  }

  componentDidMount() {
    this.getVirtueSets();
  }

  render() {
    const viewStore = this.props.viewStore;
    const virtueSets = this.props.store.virtueSets;


    return (
      <div className="App">
        <VirtueSetList
          virtueSets={virtueSets}
          viewStore={viewStore}
        />
      </div>
    );
  }
}

