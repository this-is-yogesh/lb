import React, { useState } from "react";
import Comp1 from "./components/Comp1";
import Comp2 from "./components/Comp2";
import Comp3 from "./components/Comp3";

const components = [Comp1, Comp2, Comp3];
export default function Stepper() {
  const [currentIndex, setIndex] = useState(0);
  let styles = getStyles();

  function getWidth() {
    let totalLength = Math.floor(100 / (components.length - 1)) * currentIndex;
    return `${totalLength}%`;
  }
  function renderButtons() {
    return components.map((comp, index) => (
      <button style={styles.button} onClick={() => setIndex(index)}>
        {index}
      </button>
    ));
  }
  const CurrentComponent = components[currentIndex];
  return (
    <div>
      <CurrentComponent />
      <div style={styles.verticalSpacing} />
      <div style={styles.buttonWrapper}>
        <div style={styles.mainBox}>{renderButtons()}</div>
        <div
          style={{
            ...styles.connector,
            width: getWidth(),
          }}
        />
      </div>
    </div>
  );
}

function getStyles() {
  return {
    buttonWrapper: {
      position: "relative",
    },
    mainBox: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    verticalSpacing: {
      margin: "100px 0px 100px 0px",
      width: "80%",
      height: "1px",
      backgroundColor: "grey",
      opacity: "0.4",
      marginLeft: "auto",
      marginRight: "auto",
    },
    button: {
      width: "40px",
      height: "40px",
      border: "none",
      borderRadius: "50%",
      backgroundColor: "maroon",
      color: "white",
      cursor: "pointer",
      zIndex: 2,
    },
    connector: {
      position: "absolute",
      width: "0%",
      height: "3px",
      backgroundColor: "maroon",
      opacity: "1",
      margin: "auto",
      top: "50%",
      zIndex: 0,
      transition: "width 0.6s ease-in",
    },
  };
}
