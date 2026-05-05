1. how to use cloneElement


cloneElement always expects one react element
function Wrapper({ children }) {
  return React.cloneElement(children, {
    style: { color: "red" }
  });
}
<Wrapper>
  <button>Click</button>
</Wrapper>
this becomes 
<button style={{ color: "red" }}>Click</button>

example 2:
React.cloneElement(<Component/>, {
    prev: handlePrev
  })

function Component({prev}){
<button onClick={prev}></button>
}






2. what is advantage of using 
  let compArray = [Comp1, Comp2, Comp3, Comp4];
  let ComputedComp = compArray[compCount]; 
  over 
let compArray = [<Comp1 />, <Comp2 />, <Comp3 />, <Comp4 />];
 {compArray[compCount]};

 ans : 1. props can be passed dynamically <ComputedComp onNext={handleNext} />
2. 2. ✅ Better performance 
Comp1 → just a reference (cheap)
<Comp1 /> → creates a React element every render
the first version avoids unnecessary element creation.