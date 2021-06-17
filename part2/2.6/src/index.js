import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

const persons=[

    {
      id: 1,
      content: 'Arto Hella',
 
    },
    {
      id: 2,
      content: 'Grace hopper',
 
    }    


]

ReactDOM.render(
    <App persons={persons}/>,
  document.getElementById('root')
);


