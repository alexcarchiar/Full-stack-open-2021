import React from 'react'
import Button from './Button'

const Person = (props) => {
    return(
        <li key={props.name}>{props.name} {props.number} <Button name={props.name} id={props.id} deletePerson={props.deletePerson}/></li>
    )
}

export default Person