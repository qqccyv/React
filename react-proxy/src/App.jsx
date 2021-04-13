import React, { Component } from 'react';

import List from './components/List/List';
import Search from './components/Search/Search';
import './App.css';
import axios from 'axios'
export default class App extends Component {
  search = (keyWord) => {
    console.log(keyWord);
    axios.get(`/api1/search/users?q=${keyWord}`).then(res => {
      console.log(res);
    }, error => {
      console.error(error);
    })
  }
  render() {
    return (
      <div className="container">
        <Search search={this.search}></Search>
        <List></List>
      </div>
    );
  }
}


