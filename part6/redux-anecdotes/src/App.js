import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, newAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes
      ).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
            <div>
              Has <strong>{anecdote.votes}</strong>{" "}
                  {anecdote.votes === 1 ? "vote" : "votes"}{" "}
                  <button onClick={() => vote(anecdote.id)}>Vote</button>
            </div>
        </div>
      )}
       <AnecdoteForm />
    </div>
  )
}

export default App