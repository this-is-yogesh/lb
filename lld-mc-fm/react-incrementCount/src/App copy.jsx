import { useState, useRef } from "react";
import "./App.css";

/**1-- this is what problem asked and this is a simple solution to do it , storing interval id in useRef, clearing the interval on stopbutton */
function App() {
  const [count, setCount] = useState(0);
  let intervalRef = useRef(null);

  function startButton() {
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  }

  function stopButton() {
    clearInterval(intervalRef.current);
  }

  return (
    <div className="box">
      <button onClick={startButton}>{"start"}</button>
      {count}
      <button onClick={stopButton}>{'stop'}</button>
    </div>
  );
}

export default App;
