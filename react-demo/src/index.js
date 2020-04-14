import React from 'react';
import ReactDOM from 'react-dom';

const div = React.createElement('div',{class: 'btn'},'hello!')
ReactDOM.render(div,document.querySelector('#root'))
