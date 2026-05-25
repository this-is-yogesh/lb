import { useState, useMemo } from "react";
import "./styles.css";

function App() {
  const [name, setName] = useState("Rajiv");
  const [baseSalary, setBaseSalary] = useState(0);
  const user = {
    name: name,
    baseSalary: baseSalary,
    tax: 5000,
    bonus: 10000,
    homeAllowance: 15000,
    fuelAllowance: 5000,
  };

  const grossSalary = useMemo(() => {
    let grossSalary =
      user.baseSalary +
      user.bonus +
      user.homeAllowance +
      user.fuelAllowance -
      user.tax;
    return grossSalary;
  }, [baseSalary]);
  /** dont put user has dependency as it is an object and on every render, it will
   * create a new reference and it will trigger the useMemo and it will calculate the gross salary on every render, which is not what we want. We want to calculate the gross salary only when the base salary changes. So we can put baseSalary as dependency and it will calculate the gross salary only when the base salary changes.
   */
  return (
    <div>
      <p>{`${user.name} has gross salary ${grossSalary}`}</p>
      <button onClick={() => setBaseSalary(prev => prev + 1000)}>
        Increase salary
      </button>
      <input
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
    </div>
  );
  return <></>;
}

export default App;
