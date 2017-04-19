import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import LoginForm from './LoginForm';

class App extends Component {
  getVirtueSets() {
    fetch('http://127.0.0.1:8000/virtue_sets/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + localStorage.token,
        'Accept': 'application/json'
      }
    }).then((res) => {
      return res.json();
    })
  }


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
        <LoginForm afterLogin={this.getVirtueSets}/>
      </div>
    );
  }
}

export default App;
