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

2--why is transistion used 
to do changes in property smoothly

3-- space-evenly was causing issue 
because space-evenly makes first element space out evenly from the start whereas space-between makes first element start at the very corner which was what we needed for stepper to start from corner to take account of full width

4--straightforward logic to make progressline touch exact equal width
const progressLineWidth = (100 / (list.length - 1)) * currentStep;
