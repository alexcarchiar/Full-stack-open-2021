import React from 'react'
import phonebookService from '../services/phonebookService'

const Button = (props) =>{

    return(
        <button onClick={() => props.deletePerson(props.id, props.name)}>delete</button>
    )
}

export default Button