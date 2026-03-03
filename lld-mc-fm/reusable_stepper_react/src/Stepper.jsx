const Stepper = ({ list }) => {
  const stepCount = list.length;
  const steps = [];
  for (let i = 0; i < stepCount; i++) {
    steps.push(<div key={i} className="step">{i + 1}</div>);
  }

  return (
    <div className="stepper">
      <div className="step-wrapper">{steps}</div>
      <div className="progress-line"></div>
    </div>
  );
};

export default Stepper;
