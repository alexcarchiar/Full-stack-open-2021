import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

const Button = (props) => {
  return ( 
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticsLine = (props) => {
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (good === 0 && neutral === 0 && bad === 0){
    return(
      <div>
        <p>no feedback given</p>
      </div>
    )
  } else {
    return (
      /*<div>
        <h1>Statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good+neutral+bad}</p>
        <p>average {(good - bad)/(good+neutral+bad)}</p>
        <p>positive {good/(good+bad+neutral)*100}%</p>
      </div>*/
      <div>
        <h1>Statistics</h1>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good+neutral+bad} />
        <StatisticsLine text="average" value={(good - bad)/(good+neutral+bad)} />
        <StatisticsLine text="positive %" value={good/(good+bad+neutral)*100} />
      </div>
    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <br></br>
      <Button handleClick={increaseGood} text='good'></Button>
      <Button handleClick={increaseNeutral} text='neutral'></Button>
      <Button handleClick={increaseBad} text='bad'></Button>
      <br></br>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App;
