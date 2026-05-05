import "./App.css";
import React, { useState } from "react";
import Comp1 from "./components/Comp1";
import Comp2 from "./components/Comp2";
import Comp3 from "./components/Comp3";
import Comp4 from "./components/Comp4";

export default function App() {
  const [compCount, setCompCount] = useState(0);
  let compArray = [Comp1, Comp2, Comp3, Comp4];
  let ComputedComp = compArray[compCount];

  function getWidth() {
    console.log((100 / compArray.length) * compCount, "wid");
    return (100 / (compArray.length - 1)) * compCount;
  }

  function handleNext() {
    setCompCount(prev => {
      if (prev < compArray.length - 1) {
        prev++;
      }
      return prev;
    });
  }

  function handlePrev() {
    setCompCount(prev => {
      if (prev > 0) {
        prev--;
      }
      return prev;
    });
  }
  return (
    <div className="App">
      <ComputedComp />
      <div className="button-container">
        {compArray.map((_, idx) => (
          <>
            <button
              onClick={() => setCompCount(idx)}
              style={{ background: idx <= compCount ? "maroon" : "grey" }}
            >
              {idx + 1}
            </button>
          </>
        ))}
        <div
          className="vertical-line"
          style={{
            width: `${getWidth()}%`,
          }}
        />
      </div>
      <button onClick={handleNext}>Next</button>
      <button onClick={handlePrev}>Prev</button>
    </div>
  );
}
