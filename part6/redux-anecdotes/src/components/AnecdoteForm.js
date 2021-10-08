import React from "react"
import { connect } from "react-redux"
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const newAnCont = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    props.newAnecdote(newAnCont)
    props.showNotification(`You created '${newAnCont}'`)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <input name='newAnecdote' />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default connect(null, { newAnecdote, showNotification })(AnecdoteForm)