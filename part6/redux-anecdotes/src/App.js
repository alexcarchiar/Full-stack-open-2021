import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, newAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  const createNewAnecdote = (event) => {
    event.preventDefault()
    const newAn = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    dispatch(newAnecdote(newAn))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App