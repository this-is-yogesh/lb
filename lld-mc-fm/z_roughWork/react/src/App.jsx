import React, { useState, useRef } from "react";
import "./App.css";
import useCopyHook from "./hooks/useCopyHook";

function App() {
  const [value, setValue] = useState("");
  let [copiedText, copy] = useCopyHook();

  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={() => copy(value)}>Copy Text : {copiedText}</button>
    </div>
  );
}

export default App;
