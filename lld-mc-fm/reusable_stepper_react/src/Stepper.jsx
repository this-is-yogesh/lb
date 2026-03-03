import { useState } from "react";

const Stepper = ({ list }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepCounts = list.length;
  const steps = [];
  for (let i = 0; i < stepCounts; i++) {
    steps.push(
      <div
        key={i}
        onClick={() => setCurrentStep(i)}
        className={`step ${currentStep >= i ? "active" : ""}`}
      >
        {i + 1}
      </div>,
    );
  }
  /**4-- logic to make the line go to exact width */
  const progressLineWidth = (100 / (list.length - 1)) * currentStep;
  return (
    <section>
      <div className="stepper">
        <div className="step-wrapper">{steps}</div>
        <div
          className="progress-line"
          style={{ width: `${progressLineWidth}%` }}
        ></div>
      </div>
      <div>{list[currentStep]}</div>
    </section>
  );
};

export default Stepper;
