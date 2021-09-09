import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

const Button = (props) => {
  const handleClick = props.handleClick
  const text = props.text
  return(
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const newAnecdote = () => {
    const flag = selected+1
    if(flag === anecdotes.length){
      setSelected(0)
    } else {
      setSelected(flag)
    }
  }

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const [mostPopular, setPopular] = useState(0)

  const increaseVote = () => {
    const copy = [...points]
    copy[selected]++
    setPoints(copy)
    const max = Math.max(...copy)
    setPopular(max)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      <p>The anecdote has {points[selected]} votes</p>
      <Button handleClick={increaseVote} text='vote'/>
      <Button handleClick={newAnecdote} text='new anecdote'/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostPopular]}
    </div>
  )
}

export default App;
