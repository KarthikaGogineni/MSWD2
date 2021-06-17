import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

const persons=[

    {
      id: 1,
      content: 'Arto Hellas',
      number:'040-1234567'
 
    },
    { 
      id: 2,
      content: 'Ada Lovelace', 
      number: '39-44-5323523'
     },
    { 
      id: 3,
      content: 'Dan Abramov', 
      number: '12-43-234345' 
    },
    { 
      id: 4,
      content: 'Mary Poppendieck', 
      number: '39-23-6423122'
     }   


]

ReactDOM.render(
    <App persons={persons}/>,
  document.getElementById('root')
);


