1. i was doing {components[currentIndex]()} and i tried
const component = components[currentIndex]

instead 
we should do , 
const Component = components[currentIndex]
<Component />, 

**note**
JSX uses capitalization to distinguish React components from DOM elements. Lowercase tags are compiled into string element names ("div", "button", "component"), while uppercase tags are compiled into variable references. Therefore <component /> is treated as a DOM element named "component", whereas <Component /> renders the function stored in the Component variable.

2. i was doing      
<div style={[ styles.connector, width: getWidth() ]} /div>

instead what worked was 
     <div
          style={{
            ...styles.connector,
            width: getWidth(),
          }}
        />
  
  **note**
React DOM expects the style prop to be a single JavaScript object. Unlike React Native, it does not support an array of style objects. Therefore styles must be merged manually using object spread ({ ...styles.connector, width: getWidth() }) or Object.assign(), producing one final style object that React can apply to the DOM element.

3. i did this const[components,setComponents] = useState([Comp1,Comp2,Comp3])

i should do this instead
const components = [Comp1, Comp2, Comp3];
           
**note**
useState should be used only for values that can change and trigger re-renders. Since the list of step components is static, storing it in state adds unnecessary overhead and complexity. A const array is sufficient, and if the array never changes, it's best to define it outside the component so it isn't recreated on every render.
     
 