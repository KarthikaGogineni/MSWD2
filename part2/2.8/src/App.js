import React, { useState } from 'react'
import PhoneBook from './components/PhoneBook'


const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


const addDetails=(event)=>{
  event.preventDefault()
  if(persons.find(persons=>persons.content===newName)){
    alert(newName+" is already added to the phonebook")
  }
  else if(persons.find(persons=>persons.number===newNumber)){
    alert(newNumber+" is already added to the phonebook")
  }
  else{
  const nameObject={
    content:newName,
    number:newNumber,
    id:persons.length+1
  }
  setPersons(persons.concat(nameObject))
  setNewName('')
  setNewNumber('')
}
}
const handleChange=(event)=>{

  setNewName(event.target.value)
}
const handleChangeNumber=(event)=>{

  setNewNumber(event.target.value)
}
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addDetails}>
        <div>
          name: &nbsp; &nbsp; &nbsp;<input value={newName} onChange={handleChange}/>
        </div><br/>
        <div>number:&nbsp;&nbsp;&nbsp;<input type='tel' pattern="[0-9\-]+" value={newNumber} onChange={handleChangeNumber}/></div>
        <div><br />
          <button type="submit">add</button>
        </div><br/>
      </form>
      <h2>Numbers</h2>
       {persons.map(person=>
        <PhoneBook key={person.id} person={person} />
        )}
    </div>
  )

}

export default App
