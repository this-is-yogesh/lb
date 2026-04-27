import React, { useState, useEffect } from "react";

const App = () => {
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    let flag = true;

    const fetchData = async () => {
      console.log(`🚀 Fetch START id=${id}`);

      const resp = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
      );
      const json = await resp.json();

      // 🔥 simulate network delay difference
      const delay = id === 1 ? 3000 : 1000;

      setTimeout(() => {
        console.log('resolved id',id,flag)
        if (flag) {
          setData(json);
        }
      }, delay);
    };

    fetchData();

    return () => {
      flag = false;
      console.log(`🧹 cleanup for id=${id}`);
    };
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
