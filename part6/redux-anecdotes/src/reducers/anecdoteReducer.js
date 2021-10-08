const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'Increase': {
      return state.map((anecdote) =>
        anecdote.id === action.data.id
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

export const voteAnecdote = (id) => {
  return {
    type: 'Increase',
    data: { id },
  }
}

export const newAnecdote = (anecdote) => ({
  type: 'New',
  anecdote,
})

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "Init",
    data: anecdotes,
  }
}

export default anecdoteReducer