import React, { Component } from 'react';
import { FaBars } from 'react-icons/lib/fa';

export default class Navbar extends Component {

  handleDayViewClick() {
    this.props.viewStore.expandDay()
  }

  handleChainViewClick() {
    this.props.viewStore.collapseDay()
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <a href="#" className="navbar-brand">Benjamin</a>
        <div className="dropdown">
          <div className="dropdown-toggle" data-toggle="dropdown">
            <FaBars />
          </div>
          <ul className="dropdown-menu">
            <li onClick={ this.handleDayViewClick.bind(this) }>Dayview</li>
            <li onClick={ this.handleChainViewClick.bind(this) }>Chainview</li>
          </ul>
        </div>
      </nav>
    );
  }
}
