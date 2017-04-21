import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import LoginForm from './LoginForm';
import VirtueSetList from './VirtueSetList';

class App extends Component {
  getVirtueSets() {
    fetch('http://127.0.0.1:8000/virtue_sets/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + localStorage.token,
        'Accept': 'application/json'
      }
    }).then((res) => {
      // TODO make list from items in json, pass it into VirtueSetList
      // return res.json();
      return this.renderVirtueSetList(res.json());
    });
  }

  renderVirtueSetList(json) {
    return (
      <VirtueSetList items={json.results} />
    );
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
        <LoginForm store={this.props.store} afterLogin={this.getVirtueSets.bind(this)}/>
      </div>
    );
  }
}

export default App;
