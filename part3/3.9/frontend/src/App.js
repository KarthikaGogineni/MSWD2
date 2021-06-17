import React,{useState,useEffect} from "react";
import noteService from './services/persons'
import PhoneBook from './components/PhoneBook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './App.css'


const Messages = ({message}) => {
  if(message === null){
      return null
  }


      return (
          <div className="success">
              {message}
          </div>

      )
  }
  const ErrorMessages = ({err}) => {

    if(err === null){
      return null
  }
  
        return (

              <div className="error">
                    {err}
                </div>
        )
    }

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errormessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    
      noteService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
        console.log(response)
      })
  }, [])

const addDetails=(event)=>{
  event.preventDefault()
  if(persons.find(persons=>persons.content===newName)){
    if(window.confirm(`${newName} is already added to the phonebook,replace the old number with a new one?`)){
      const personfind = persons.find((person) => person.content.toLowerCase().includes(newName.toLowerCase()))
      const nameObject={
        ...personfind,
        number:newNumber,
      }
      noteService.update(personfind.id,nameObject)
      .then(()=>{
      setPersons(persons.map(person=>personfind.id!==person.id?person:nameObject))})
      .catch((err) => {
        setErrorMessage( `${personfind.content} has already been removed from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setPersons( persons.filter((person) => person.id !== personfind.id));
      });
      setNewName('')
      setNewNumber('')
 
    }
  }
  else if(persons.find(persons=>persons.number===newNumber)){
    alert(newNumber+" is already added to the phonebook")
  }
  else{
  const nameObject={
    content:newName,
    number:newNumber,
  }
   noteService.create(nameObject)
   .then(response=>{
  setPersons(persons.concat(response))
  setNewName('')
  setNewNumber('')
  setMessage(`Added ${newName} !`);
  setTimeout(() => setMessage(null), 5000);
   })
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
    else{
      return null;
    }
  })
  const removePerson = (id, name) => {
    if ( window.confirm(`Delete ${name} ?`)) {
      noteService
        .deleteP(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
   
    } else {
      return;
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Messages message={message}/>
      <ErrorMessages err={errormessage}/>
      <Filter onChange={handleFilterChange}/>
      <PersonForm onSubmit={addDetails} valueName={newName} onChangeName={handleChange} valueNumber={newNumber} onChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
       {display.map(person=>
        <PhoneBook key={person.id} person={person}  removePerson={removePerson}/>
        )}
    </div>
  )


}
export default App