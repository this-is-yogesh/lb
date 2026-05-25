/**
 *  limitation of memo -  memo only memorize the value not functions / objects.
 * memo does Object.is(prevProp, nextProp) shallow comparison to check if props changed. 
 * Functions and objects let’s clarify this first, in javascript functions are also objects (first-class objects). So, objects in javascript are of reference type which means it creates a new reference every time in the memory. So, on every update object is making a new reference and this is the reason why memo is not able to memorize it, because memo is thinking this is a new value and it re renders the component. But actually functions are same, so here memo has limitation and “useCallback” comes into picture.
 * Functions inside React components get recreated on every render.

When these functions are passed as props to memoized children,
their changed references make React think props changed,
causing unnecessary rerenders.

useCallback memoizes the function reference and only recreates it
when dependencies change, helping memoized children avoid rerendering.


If a new function is passed as prop, it will always be different from the previous one, causing the child to rerender.

In the example, updateChild1 and updateChild2 are memoized with useCallback, so their references remain the same across renders unless their dependencies change. This allows Child1 and Child2 to avoid unnecessary rerenders when the parent updates.
 */

export default App = () => {
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