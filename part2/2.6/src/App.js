import React, { useState } from 'react'
import PhoneBook from './components/PhoneBook'


const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')


const addName=(event)=>{
  event.preventDefault()
  const nameObject={
    content:newName,
    id:persons.length+1
  }
  setPersons(persons.concat(nameObject))
  setNewName('')
}
const handleChange=(event)=>{

  setNewName(event.target.value)
}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
       {persons.map(person=>
        <PhoneBook key={person.id} person={person} />
        )}
        </ul>
    </div>
  )

}

export default App
