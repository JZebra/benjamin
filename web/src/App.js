import React, { Component } from 'react';
import './App.css';
import Button from './Button';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Benjamin</h2>
        </div>
        <p className="App-intro">
          Hello world!
        </p>
        <Button onClick={()=>console.log('clicked')} value="click here"/>
      </div>
    );
  }
}

export default App;
