import { useState } from "react";
//import './App.css'

function App() {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState(0);

  function onChangeFunction(event) {
    let { value } = event.target;
  }
  return (
    <div>
      <input value={value} onChange={onChangeFunction} placeholder="search" />
      <div>{result}</div>
    </div>
  );
}

export default App;
