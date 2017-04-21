import React, { Component } from 'react';
import './VirtueSet.css';

// props: title

class VirtueSet extends Component {
  render() {
    return (
      <li className='VirtueSet'>
        <h1>This is VirtueSet: {this.props.title}</h1>
      </li>
    );
  }
}

export default VirtueSet;



