import { useState, useEffect, useRef } from "react";

export default function ImageSlider({
  image1 = "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  image2 = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  width = "600px",
  height = "400px",
}) {
  let overlayImageRef = useRef(null);
  let draggerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setisDragging] = useState(false);

  function handleMouseMove(e) {
    // if (!isDragging) return;
    if (!draggerRef.current) return;
    let rect = overlayImageRef.current.getBoundingClientRect();
    let position = ((e.clientX - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(position, 100));
    setSliderPos(position);
  }
  function handleMouseUp(e) {
    draggerRef.current = false;
    //setisDragging(false);
  }
  function handleMouseDown(e) {
    draggerRef.current = true;
    //setisDragging(true);
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      style={{
        position: "relative",
        height,
        width,
        backgroundColor: "red",
      }}
    >
      <div>
        <img
          src={image1}
          alt="baseImage"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div ref={overlayImageRef}>
        <img
          src={image2}
          alt="overlayImage"
          style={{
            width: `${sliderPos}%`,
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div
        style={{
          width: "4px",
          height: "100%",
          position: "absolute",
          backgroundColor: "white",
          top: 0,
          left: `${sliderPos}%`,
        }}
      />
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: "50px",
          height: "50px",
          position: "absolute",
          backgroundColor: "white",
          borderRadius: "50%",
          top: `50%`,
          left: `${sliderPos}%`,
          transform: `translate(-50%,0%)`,
          cursor: "pointer",
        }}
      />
    </div>
  );
}
