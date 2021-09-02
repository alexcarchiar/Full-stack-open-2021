import logo from './logo.svg';
import './App.css';

function App() {
  console.log('Hello from component')
  const now = new Date()
  const a = 10
  const b = 20
  return (
    <div className="App">
      <p>Hello world, it is {now.toString()}</p>
      <p>{a} plus {b} equals {a+b}</p>
    </div>
  );
}

export default App;
