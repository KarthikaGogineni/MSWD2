import React, { useState } from 'react'
import PhoneBook from './components/PhoneBook'


const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')


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
const handleFilterChange = (e) => {
  setFilter(e.target.value)

}
const display=persons.filter((filtered)=>{
    if(filter==='')
    {
      return persons
    }
    else if(filtered.content.toLowerCase().includes(filter.toLowerCase()))  {
        return filtered
    }

  })

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with &nbsp;<input onChange={handleFilterChange} /> 
      <form onSubmit={addDetails}>
      <h2>add a new</h2>
        <div>
          name: &nbsp; &nbsp; &nbsp;<input value={newName} onChange={handleChange}/>
        </div><br/>
        <div>number:&nbsp;&nbsp;&nbsp;<input type='tel' pattern="[0-9\-]+" value={newNumber} onChange={handleChangeNumber}/></div>
        <div><br />
          <button type="submit">add</button>
        </div><br/>
      </form>
      <h2>Numbers</h2>
       {display.map(person=>
        <PhoneBook key={person.id} person={person} />
        )}
    </div>
  )

}

export default App
