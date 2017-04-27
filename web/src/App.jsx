import React, { Component } from 'react';
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

import ChainViewContainer from './ChainViewContainer';
import Navbar from './Navbar';
import VirtueSetList from './VirtueSetList';
import { _fetch } from './utils';

@observer
export default class App extends Component {

  componentDidMount() {
    this.props.appStore.loadVirtueSets();
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

  renderNavBar() {
    const viewStore = this.props.viewStore;

    return (
      <Navbar
        viewStore={ viewStore }
      />
    )
  }

  renderVirtueSetList() {
    const appStore = this.props.appStore;
    const viewStore = this.props.viewStore;
    const virtueSets = this.props.appStore.virtueSets;

    return (
        <VirtueSetList
          appStore={ appStore }
          virtueSets={ virtueSets }
          viewStore={ viewStore }
        />
      )
  }

  renderDevTools() {
    // TODO: conditionally render this in dev environments
    return (
      <DevTools />
    )
  }

  render() {
      return (
        <div>
        { this.renderNavBar() }
        {this.props.viewStore.currentView.chainView &&
          this.renderChainView()
        }
        {this.props.viewStore.currentView.dayView &&
          this.renderVirtueSetList()
        }
        { this.renderDevTools() }
        </div>
      );
    }
  }
