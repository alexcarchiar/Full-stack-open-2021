import React from "react"
import { useDispatch } from "react-redux"
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const newAnCont = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(newAnecdote(newAnCont))
    dispatch(showNotification(`You created '${newAnCont}'`))
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

export default AnecdoteForm