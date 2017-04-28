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
      <nav className="navbar navbar-inverse bg-success navbar-toggleable-md">
        <button className="navbar-toggler navbar-toggler-right" type="button"
          data-toggle="collapse" data-target="#navbar-collapse">
          <FaBars />
        </button>
        <a href="#" className="navbar-brand">Benjamin</a>

        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button onClick={ this.handleDayViewClick.bind(this) }
                type="button" className="nav-link btn btn-outline-success">
                Day View
              </button>
            </li>
            <li className="nav-item">
              <button onClick={ this.handleChainViewClick.bind(this) }
                type="button" className="nav-link btn btn-outline-success">
                Chain View
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
