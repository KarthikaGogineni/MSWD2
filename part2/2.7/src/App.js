import React, { useState } from 'react'
import PhoneBook from './components/PhoneBook'


const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')


const addName=(event)=>{
  event.preventDefault()
  if(persons.find(persons=>persons.content===newName)){
    alert(newName+" is already added to the phonebook")
  }
  else{
  const nameObject={
    content:newName,
    id:persons.length+1
  }
  setPersons(persons.concat(nameObject))
  setNewName('')
}
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
       {persons.map(person=>
        <PhoneBook key={person.id} person={person} />
        )}
    </div>
  )

}

export default App
