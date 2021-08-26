import logo from './logo.svg';
import './App.css';

const Hello = (props) => {
  const now = new Date()
  const a = 10;
  const b = 20
  return (
    <div>
      <p>Hello {props.name}, today it is {now.toString()}</p>
      <p>I was told you're {props.age} years old</p>
      <p>Furthermore, {a} plus {b} is {a + b}</p>
    </div>
  )
}

const App = () => {
  console.log("Hello from component")
  const age = 18
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Hello name="George" age={10}/>
        <Hello name="Rosalia" age={age}/>
      </header>
    </div>
  );
}



export default App;
