/** there are two api calls, one fast and one slow, first slow is happeing and when it is happening you make request for fast api calls then fast api will resolve first and then after some time old will resovle and it will show right now which is wrong because it is old data, new data should show */

// this is the problematic code

/**
 * 
 * import React, { useState, useEffect } from "react";
 
 const App = () => {
   const [id, setId] = useState(1);
   const [data, setData] = useState(null);
 
   useEffect(() => {
 
     const fetchData = async () => {
       console.log(`🚀 Fetch START id=${id}`);
 
       const resp = await fetch(
         `https://jsonplaceholder.typicode.com/todos/${id}`,
       );
       const json = await resp.json();
 
       // 🔥 simulate network delay difference
       const delay = id === 1 ? 3000 : 1000;
 
       setTimeout(() => {
         console.log(`⏱ Response READY id=${id}`);
           setData(json);
       }, delay);
     };
 
     fetchData();

   }, [id]);
 
   return (
     <div style={{ fontFamily: "sans-serif", padding: 20 }}>
       <h2>Real API + Flag Demo</h2>
 
       <button onClick={() => setId(1)}>Load ID 1 (slow)</button>
       <button onClick={() => setId(2)}>Load ID 2 (fast)</button>
 
       <h3>Current ID: {id}</h3>
       <h3>Data: {data ? data.title + id : "Loading..."}</h3>
     </div>
   );
 };
 
 export default App;
 
 */
