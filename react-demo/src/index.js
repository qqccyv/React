import React from 'react';
import ReactDOM from 'react-dom';

// const div = React.createElement('div',{class: 'btn'},'hello!')
// ReactDOM.render(div,document.querySelector('#root'))


// let a = 666
// let classss = 'btn'
// const h1 = <h1 className={classss}>hello jsx{a}</h1>
// ReactDOM.render(h1,document.querySelector('#root'))

const songs = [
  {id: 1, name: '需要人陪'},
  {id: 2, name: '像我这样的人'},
  {id: 3, name: '痴心绝对'}
]

const ul = (
  <ul>
    {songs.map(item=><li style={
      {color: 'red'}
    } key={item.id}>{item.name}</li>)}
  </ul>
)

ReactDOM.render(ul,document.querySelector('#root'))
