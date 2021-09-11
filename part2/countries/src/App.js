import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Result from './Components/Result'

const App = () => {

  const [ countries, setCountries] = useState([])
  useEffect( () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then( r => {
      setCountries(r.data)
    })
  }, [])

  const [ newFilter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      Find countries <input value={newFilter} onChange={handleFilterChange}/>
      <Result countries={countries} filter={newFilter} setFilter={setFilter}/>

    </div>
  );
}

export default App;
