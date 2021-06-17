import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

const persons=[

    {
      id: 1,
      content: 'Arto Hellas',
      number:'040-1234567'
 
    }   


]

ReactDOM.render(
    <App persons={persons}/>,
  document.getElementById('root')
);


