import { useState, useMemo } from "react";
import "./styles.css";
import useMemoPolyfill from "./hooks/useMemoPolyfill";

function useMemoExample() {
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

  let callback = () => {
    let grossSalary =
      user.baseSalary +
      user.bonus +
      user.homeAllowance +
      user.fuelAllowance -
      user.tax;
    return grossSalary;
  };
  const grossSalarys = useMemoPolyfill(callback, [name]);
  return (
    <div>
      <p>{`${user.name} has gross salary ${grossSalarys}`}</p>
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

const App = () => {
  const [parent, setParent] = useState(0);
  const [child1, setChild1] = useState(0);
  const [child2, setChild2] = useState(0);

  const updateParent = () => {
    setParent(Math.floor(Math.random() * 100) + 1);
  };

  const updateChild1 = useCallback(() => {
    setChild1(Math.floor(Math.random() * 100) + 1);
  }, []);

  const updateChild2 = useCallback(() => {
    setChild2(Math.floor(Math.random() * 100) + 1);
  }, []);

  console.log("Parent rerendered");

  return (
    <>
      <p>Parent - {parent}</p>
      <button onClick={updateParent}>Update Parent</button>

      <Child1 value={child1} updateChild1={updateChild1} />
      <Child2 value={child2} updateChild2={updateChild2} />
    </>
  );
};

const Child1 = memo(({ value, updateChild1 }) => {
  console.log("Child 1 rerendered");

  return (
    <>
      <p>Child 1 - {value}</p>
      <button onClick={updateChild1}>Update Child 1</button>
    </>
  );
});

const Child2 = memo(({ value, updateChild2 }) => {
  console.log("Child 2 rerendered");

  return (
    <>
      <p>Child 2- {value}</p>
      <button onClick={updateChild2}>Update Child 2</button>
    </>
  );
});

export default App;
