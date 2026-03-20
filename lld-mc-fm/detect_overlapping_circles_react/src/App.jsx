import "./App.css";
import { useState, useEffect } from "react";

const RADIUS = 50;
function App() {
  const [cirlceCoords, setCircleCoords] = useState([]);

  useEffect(() => {
    document.addEventListener("click", drawCircle);

    return () => {
      document.removeEventListener("click", drawCircle);
    };
  }, []);

  function drawCircle(e) {
    console.log("drawCircle");
    /**1-- clientx and clienty we get from e */
    const { clientX, clientY } = e;
    console.log(clientX, clientY);
    const newCoords = {
      top: clientY - RADIUS,
      left: clientX - RADIUS,
      bottom: clientY + RADIUS,
      right: clientX + RADIUS,
      background: "red",
    };
    console.log(newCoords, "newCoords**", clientY, clientX);

    setCircleCoords(prev => {
      for (let i = 0; i < prev.length; i++) {
        if (ElementOverlap(newCoords, prev[i])) {
          newCoords.background = "green";
          break;
        }
      }

      return [...prev, newCoords];
    });
  }
  return (
    <div>
      {cirlceCoords.map(element => {
        return <Cirlce {...element} key={Math.random() * element.top} />;
      })}
    </div>
  );
}

function Cirlce({ top, left, background }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        background,
        borderRadius: "50%",
        width: RADIUS * 2,
        height: RADIUS * 2,
      }}
    ></div>
  );
}

function ElementOverlap(circle1, circle2) {
  const collide = !(
    circle1.right < circle2.left || 
    circle1.left > circle2.right || 
    circle1.bottom < circle2.top || 
    circle1.top > circle2.bottom 
  );
  return collide;
}

export default App;
