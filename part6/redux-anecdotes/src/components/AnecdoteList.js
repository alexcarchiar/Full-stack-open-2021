import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const anecdotes = state.anecdotes
    const filter = state.filter
    if (filter === '') return anecdotes

    return anecdotes.filter(
      (anecdote) =>
        anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
    )
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted '${anecdote.content}'`, 4))
  }
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes) &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              Has <strong>{anecdote.votes}</strong>{" "}
              {anecdote.votes === 1 ? "vote" : "votes"}{" "}
              <button onClick={() => vote(anecdote)}>Vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList