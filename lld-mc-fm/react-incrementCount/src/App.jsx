import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  let intervalRef = useRef(null);

  function startButton() {
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
      /**1--
       * 
       * same here
       * function handleClick() {
  fetch("https://dummyjson.com/test")
    .then(() => {
      setCount(count + 1);
    });
}
    count here will be the value when handleclick was made, multiple handleclick will do just setCount(0+1)

  so in javascript  function remembers the variables as they were when the function was created, not when it runs later.
  hence doing setCount(prev=>prev+1) gives the latest state value
       * 
       */
    }, 1000);
  }

  function stopButton() {
    clearInterval(intervalRef.current);
  }

  return (
    <div className="box">
      <button onClick={startButton}>{"start"}</button>
      {count}
      <button onClick={stopButton}>{"stop"}</button>
    </div>
  );
}

function AppUseEffect() {
  /**2-- second way of doing it , first count then countClean */
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (start) {
      console.log(count, "count");
      timerRef.current = setTimeout(() => {
        setCount(count + 1);
      }, 1000);
    }
    return () => {
      console.log(count, "countClean");
      clearTimeout(timerRef.current);
    };
  }, [count, start]);
  function startButton() {
    setStart(true);
  }
  function stopButton() {
    clearTimeout(timerRef.current);
    setStart(false);
  }
  return (
    <div className="box">
      <button onClick={startButton}>{"start"}</button>
      {count}
      <button onClick={stopButton}>{"stop"}</button>
    </div>
  );
}
export default AppUseEffect;
