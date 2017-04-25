import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import VirtueSetList from './VirtueSetList';

class App extends Component {
  getVirtueSets() {
    fetch('http://:8000/api/virtue_sets/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + this.props.store.token,
        'Accept': 'application/json'
      }
    }).then((res) => {
      // TODO make list from items in json, pass it into VirtueSetList
      // return res.json();
      console.log(res.json())
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
        <Button onClick={this.getVirtueSets.bind(this)} value="click here"/>
      </div>
    );
  }
}

export default App;
