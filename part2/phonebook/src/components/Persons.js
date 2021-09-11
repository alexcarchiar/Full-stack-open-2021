import React from 'react'

const Persons = (props) => {
    return(
        <div id='numbers'>
          <ul>
            {props.persons.filter(p => p.name.toLowerCase().match(props.newFilter.toLowerCase())).map( p => 
              <li key={p.name}>{p.name} {p.number}</li>)}
          </ul>
        </div>
    )
}

export default Persons