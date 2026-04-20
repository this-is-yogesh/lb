import React, { useState, useRef } from "react";
import "./App.css";
import useCopyHook from "./hooks/useCopyHook";

function App() {
  let timerRef = useRef(0);
  let current = 0;
  const [time, setTime] = useState(0);

  function startTimer() {
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
  }
  return (
    <div>
      <button onClick={startTimer}>Start </button>
      {time}
      <button onClick={stopTimer}>Stop </button>
    </div>
  );
}

export default App;
