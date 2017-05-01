// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import moment from 'moment';

import SplashScreen from './SplashScreen';
import ChainViewContainer from './ChainViewContainer';
import Navbar from './Navbar';
import VirtueSetList from './VirtueSetList';
import { _fetch, _format } from './utils';


@observer
export default class App extends Component {

  componentDidMount() {
    const start = _format(moment().startOf('day').subtract(10, 'days'));
    const end = _format(moment().startOf('day'));

    this.props.appStore.loadVirtueSets();
    this.props.appStore.loadVirtueEntries(start, end);
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
    const appStore = this.props.appStore;

      return (
        <div>
            <SplashScreen isLoading={appStore.isLoading} />
        { this.renderNavBar() }
        { this.props.viewStore.currentView.chainView &&
          this.renderChainView()
        }
        { this.props.viewStore.currentView.dayView &&
          this.renderVirtueSetList()
        }
        { this.renderDevTools() }
        </div>
      );
    }
}
