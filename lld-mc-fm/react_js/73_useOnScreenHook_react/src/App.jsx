import { useState, useRef } from "react";
import "./App.css";
import useOnScreenHook from "./hooks/useOnScreenHook";

function Element({ index }) {
  const ref = useRef();
  const isInViewPort = useOnScreenHook(ref);
  // console.log(index, "isInViewPort**");
  // if (isInViewPort) {
  //   console.log(index,'indexViewport');
  // }
  return (
    <div key={index} ref={ref} className="blocks">
      {index}
    </div>
  );
}
function App() {
  const blocks = new Array();

  for (let i = 0; i < 50; i++) {
    blocks.push(<Element index={i + 1} key={i} />);
  }
  return <div className="container">{blocks}</div>;
}

export default App;
