import { useState } from "react";
import "./App.css";
import Stepper from "./Stepper";

function App() {
  const list = [<Comp1 />, <Comp2 />, <Comp3 />];
  return (
    <div>
      <Stepper list={list} />
    </div>
  );
}

const Comp1 = () => {
  return <div>comp1</div>;
};
const Comp2 = () => {
  return <div>comp2</div>;
};
const Comp3 = () => {
  return <div>comp3</div>;
};
export default App;
