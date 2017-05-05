// @flow

import React, { Component } from 'react';
import { FaBars } from 'react-icons/lib/fa';

export default class Navbar extends Component {

  handleDayViewClick(): void {
    this.props.appStore.selectDay(this.props.appStore.getToday());
    this.props.viewStore.openDayView();
  }

  handleChainViewClick(): void {
    this.props.viewStore.openChainView()
  }

  handleScrollViewClick(): void {
    this.props.viewStore.openScrollView()
  }

  render(): React$Element<any> {
    return (
      <nav className="navbar navbar-inverse bg-success navbar-toggleable-md">
        <button className="navbar-toggler navbar-toggler-right" type="button"
          data-toggle="collapse" data-target="#navbar-collapse">
          <FaBars />
        </button>
        <a href="#" className="navbar-brand">Benjamin</a>

        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button id="navbar-today-button" onClick={ this.handleDayViewClick.bind(this) }
                type="button" className="nav-link btn btn-outline-success">
                Today
              </button>
            </li>
            <li className="nav-item">
              <button id="navbar-overview-button" onClick={ this.handleChainViewClick.bind(this) }
                type="button" className="nav-link btn btn-outline-success">
                Weekly Overview
              </button>
            </li>
            <li className="nav-item">
              <button id="navbar-scroll-button" onClick={ this.handleScrollViewClick.bind(this) }
                type="button" className="nav-link btn btn-outline-success">
                Monthly Overview
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
