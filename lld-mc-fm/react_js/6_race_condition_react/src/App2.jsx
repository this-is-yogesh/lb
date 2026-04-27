import React, { useState, useEffect } from "react";

const App = () => {
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const resp = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
          { signal: controller.signal },
        );

        const json = await resp.json();

        // simulate delay (same as your example)
        const delay = id === 1 ? 3000 : 1000;

        setTimeout(() => {
          if (!controller.signal.aborted) {
            console.log("resolved id", id, controller.signal.aborted);
            setData(json);
          } else {
            console.log("ignored due to abort", id, controller.signal.aborted);
          }
        }, delay);
      } catch (e) {
        if (e.name === "AbortError") {
          console.log(`❌ Request aborted id=${id}`);
        } else {
          console.error(e);
        }
      }
    };

    fetchData();

    return () => {
   //   console.log(`🧹 cleanup → abort id=${id}`);
      controller.abort(); // 🔥 key line
    };
  }, [id]);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2>AbortController Demo</h2>

      <button onClick={() => setId(1)}>Load ID 1 (slow)</button>
      <button onClick={() => setId(2)}>Load ID 2 (fast)</button>

      <h3>Current ID: {id}</h3>
      <h3>Data: {data ? data.title + id : "Loading..."}</h3>
    </div>
  );
};

export default App;
