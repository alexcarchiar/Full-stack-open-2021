import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'Increase': {
      return state.map((anecdote) =>
        anecdote.id === action.data
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    }
    case 'New': {
      return [...state, action.data]
    }
    case "Init":
      return action.data;
    default: return state;
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'Increase',
      data: anecdote.id,
    })
  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'New',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'Init',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer