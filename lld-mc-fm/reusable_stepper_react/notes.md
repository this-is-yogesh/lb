1-- how to draw a stepper line from one circle to another and zindex importance
    <div className="stepper">
      <div className="step-wrapper">{steps}</div>
      <div className="progress-line"></div>
    </div>
.step-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.stepper{
  position: relative;
}

.step {
  background-color: gray;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.progress-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: gray;
  top: 50%;
  z-index: -1;
}

2--