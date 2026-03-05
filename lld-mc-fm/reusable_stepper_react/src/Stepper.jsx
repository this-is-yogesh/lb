import React, { useState } from "react";

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
  const onNext = () => {
    if (currentStep !== list.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const onPrev = () => {
    console.log("onPrev*", currentStep);

    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  return (
    <section>
      <div className="stepper">
        <div className="step-wrapper">{steps}</div>
        <div
          className="progress-line"
          style={{ width: `${progressLineWidth}%` }}
        ></div>
      </div>
      {/**5-- we have to pass the prev and next to list[currentStep] , how can we pass that , list is array of components, so how can we pass functions to array of components */}
      <div>{React.cloneElement(list[currentStep], { onNext, onPrev })}</div>
    </section>
  );
};

export default Stepper;
