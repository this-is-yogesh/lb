import React, { useState, useRef } from "react";
import "./App.css";
import useOnScreenHook from "./hooks/useOnScreenHook";

function Element({ number }) {
  let elementRef = useRef();
  let isVisible = useOnScreenHook(elementRef);
  return (
    <div className="single_product" ref={elementRef}>
      {isVisible ? `${number} -  visible ` : ""}
    </div>
  );
}

function App() {
  const [products, setProducts] = useState(
    Array.from({ length: 50 }, (_, index) => {
      return index + 1;
    }),
  );
  return (
    <div className="products_box">
      {products?.length > 0 &&
        products.map((prd, idx) => {
          return <Element key={idx} number={prd} />;
        })}
    </div>
  );
}

export default App;
