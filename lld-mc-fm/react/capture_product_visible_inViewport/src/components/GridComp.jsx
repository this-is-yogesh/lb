import { useRef, useState } from "react";
import useOnScreenHook from "../hooks/useOnScreenHook";

export default function Grid() {
  const styles = getStyles();
  const [count, setCount] = useState(0);
  const elementsRef = useRef([]);
  useOnScreenHook(elementsRef);
  let array = Array.from({ length: 100 }, (_, index) => {
    return index + 1;
  });
  return (
    <div>
      <h4 style={styles.header}>Grid Components</h4>
      <button onClick={() => setCount(prev => prev + 1)}>render button</button>
      <div style={styles.arrayGrid}>
        {array.map((value, index) => (
          <div
            key={value + index}
            style={styles.gridBox}
            ref={el => (elementsRef.current[index] = el)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

function getStyles() {
  return {
    header: {
      textAlign: "center",
    },
    arrayGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "10px",
    },
    gridBox: {
      height: "30px",
      width: "auto",
      backgroundColor: "red",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      cursor: "pointer",
    },
  };
}
