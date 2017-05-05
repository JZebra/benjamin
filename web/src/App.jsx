// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import moment from 'moment';

import SplashScreen from './SplashScreen';
import ChainViewContainer from './ChainViewContainer';
import Navbar from './Navbar';
import VirtueSet from './VirtueSet';
import ScrollView from './ScrollView';
import { _fetch, _format } from './utils';


@observer
export default class App extends Component {

  componentDidMount() {
    // const start = _format(moment().startOf('day').subtract(10, 'days'));
    // const end = _format(moment().startOf('day'));

    this.props.appStore.loadVirtues();
    this.props.appStore.loadVirtueStars();
    // this.props.appStore.loadVirtueEntries(start, end);
    this.props.appStore.loadAllVirtueEntries();
  }

  renderChainView() {
    const viewStore = this.props.viewStore;
    const appStore = this.props.appStore;

    if (appStore.isLoading) {
      return <div />
    } else {
      return (
        <ChainViewContainer
          appStore={ appStore }
          viewStore={ viewStore }
        />
      )
    }
  }

  renderNavBar() {
    const appStore = this.props.appStore;
    const viewStore = this.props.viewStore;

    return (
      <Navbar
        viewStore={ viewStore }
        appStore={ appStore }
      />
    )
  }

  renderVirtueSet() {
    const appStore = this.props.appStore;
    const viewStore = this.props.viewStore;

    return (
        <VirtueSet
          appStore={ appStore }
          viewStore={ viewStore }
        />
      )
  }

  renderScrollView() {
    return (
      <ScrollView
        appStore={this.props.appStore}
        viewStore={this.props.viewStore}
      />)
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
            this.renderVirtueSet()
          }
          { this.props.viewStore.currentView.scrollView &&
            this.renderScrollView()
          }
          { this.renderDevTools() }
        </div>
      );
    }
}
