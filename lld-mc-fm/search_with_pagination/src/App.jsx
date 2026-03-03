import { useState, useEffect } from "react";
import "./App.css"

function App() {
  const [responseData, setResponseData] = useState([]);
  function makeApiCall() {
    fetch(`https://api.unsplash.com/photos?page=${1}&per_page=${30}`, {
      headers: {
        Authorization: "Client-ID 9DNy2sKxNxj0pjzYorqspswc1kQIggOgBYLgn8D7qS4",
      },
    })
      .then(res => res.json())
      .then(data => {
        let listOfObj = data.map(d => {
          let singleObj = {
            id: d.id,
            imageUrl: d.urls.raw,
            user_name: d.user?.name,
          };
          return singleObj;
        });
        console.log(listOfObj?.length, "listOfObj**");
        setResponseData(listOfObj);
      });
  }

  useEffect(() => {
    makeApiCall();
  }, []);

  return (
    <div>
      <div className="area">
        {responseData?.length > 0 &&
          responseData?.map(data => {
            return (
              <div className="single_response" key={data?.id}>
                <img height={300} width={300} src={data?.imageUrl} />
                <div className="name">{data?.user_name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
