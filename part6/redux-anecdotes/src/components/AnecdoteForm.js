import React from "react"
import { useDispatch } from "react-redux"
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const createNewAnecdote = (event) => {
    event.preventDefault()
    const newAn = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(newAnecdote(newAn))
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