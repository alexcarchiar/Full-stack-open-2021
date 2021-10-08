import React from "react"
import { useDispatch } from "react-redux"
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const newAnCont = event.target.newAnecdote.value
    const newAn = await anecdoteService.createNew(newAnCont)
    event.target.newAnecdote.value = ''
    dispatch(newAnecdote(newAn))
    dispatch(showNotification(`You created '${newAn}'`))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, 4000)
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