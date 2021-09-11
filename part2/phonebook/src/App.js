import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

const App = () =>  {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const person = {
      name: newName
    }
    if(persons.filter(p => p.name === person.name).length == 0){ //checking that the person is already included
      //apparently, JS is like Java or Python: if you put objects in an array, you need to manually compare the fields
      setPersons(persons.concat(person))
    } else {
      alert(newName + ' is already added')
    }
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div id='numbers'>
          <ul>
            {persons.map( p => 
              <li key={p.name}>{p.name}</li>)}
          </ul>
        </div>
    </div>
  );
}

export default App;
