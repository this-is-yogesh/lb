import { useState } from "react";
import "./App.css";
import Stepper from "./Stepper";

function App() {
  const list = [<Comp1 />, <Comp2 />, <Comp3 />, <Comp4 />];
  return (
    <div>
      <Stepper list={list} />
    </div>
  );
}

const Comp1 = ({ onNext, onPrev }) => {
  return(
  <>
    <button onClick={onNext}>Next</button>
    <div>comp1</div>
    <button onClick={onPrev}>Prev</button>
  </>
  )

};
const Comp2 = ({ onNext, onPrev }) => {
  return (
    <>
      <button onClick={onNext}>Next</button>
      <div>Comp2</div>
      <button onClick={onPrev}>Prev</button>
    </>
  );
};
const Comp3 = ({ onNext, onPrev }) => {
  return (
    <>
      <button onClick={onNext}>Next</button>
      <div>comp3</div>
      <button onClick={onPrev}>Prev</button>
    </>
  );
};
const Comp4 = ({ onNext, onPrev }) => {
  return (
    <>
      <button onClick={onNext}>Next</button>
      <div>comp4</div>
      <button onClick={onPrev}>Prev</button>
    </>
  );
};
export default App;
