import React from 'react'
import Person from './Person.js'

const Persons = (props) => {
    return(
        <div id='numbers'>
          <ul>
            {props.persons.filter(p => p.name.toLowerCase().match(props.newFilter.toLowerCase())).map( p => 
              //<li key={p.name}>{p.name} {p.number}</li>)}
              <Person name={p.name} number={p.number}/>)}
          </ul>
        </div>
    )
}

export default Persons