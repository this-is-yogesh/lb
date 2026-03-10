import { useState } from "react";
import "./App.css";
import useCopy from "./hooks/useCopy";
function App() {
  const [value, setValue] = useState("");
  const copy = useCopy();

  return (
    <div>
      <div>
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
        ></textarea>
      </div>
      <button onClick={() => copy(value)}> Copy</button>
    </div>
  );
}

export default App;
