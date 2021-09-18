import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'
import phonebookService from './services/phonebookService';
import ErrorMessage from './components/ErrorMessage';

const App = () =>  {

  const url = 'http://localhost:3001/persons'
  const [persons, setPersons ] = useState([])

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorClass, setErrorClass] = useState('success')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const person = {
      name: newName,
      number: newNumber
    }
    if(persons.filter(p => p.name === person.name).length === 0){ //checking that the person is already included
      //apparently, JS is like Java or Python: if you put objects in an array, you need to manually compare the fields
      /*axios
      .post(url, person).then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      }).catch(console.log("Error while saving"))*/
      phonebookService
      .create(person).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setErrorMessage(
          `Added '${person.name}'`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      //setPersons(persons.concat(person))
    } else {
      if(window.confirm(newName + ' is already added, replace the old number with a new one?')){
        const oldPerson = persons.filter(p => p.name === person.name)[0]
        phonebookService.update(oldPerson.id,person).then( () => {
          let newPeople = persons.filter(p => p !== oldPerson)
          newPeople = newPeople.concat(person)
          setPersons(newPeople)
          setErrorClass('success')
          setErrorMessage(
            `Updated '${person.name}'`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
        ).catch(error => {
          setErrorClass('error')
          setErrorMessage(
            `Couldn't update '${person.name}'`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        
      }
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

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const deletePerson = (id, name) => {
    if(window.confirm('Would you like to delete ' + name + '?')){
      phonebookService.deleting(id).then(() => {
        const newPersons = persons.filter((item => item.id !== id))
        setPersons(newPersons)
        setErrorClass('success')
        setErrorMessage(
          `Removed '${name}'`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage} className={errorClass}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new person</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  );
}

export default App;
