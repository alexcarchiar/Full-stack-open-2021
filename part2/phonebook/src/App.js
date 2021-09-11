import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

const App = () =>  {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
   },
   { name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const person = {
      name: newName,
      number: newNumber
    }
    if(persons.filter(p => p.name === person.name).length == 0){ //checking that the person is already included
      //apparently, JS is like Java or Python: if you put objects in an array, you need to manually compare the fields
      setPersons(persons.concat(person))
    } else {
      alert(newName + ' is already added')
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div id='numbers'>
          <ul>
            {persons.map( p => 
              <li key={p.name}>{p.name} {p.number}</li>)}
          </ul>
        </div>
    </div>
  );
}

export default App;