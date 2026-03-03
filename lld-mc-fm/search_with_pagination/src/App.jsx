import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [responseData, setResponseData] = useState([]);
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  function makeApiCall() {
    fetch(`https://api.unsplash.com/photos?page=${1}&per_page=${30}`, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
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
            /**1-- doing {..data} is exactly same as writing
             * id={1} imageUrl={https://} user_name={'lakeO'}
             */
            return <ImageComponent key={data.id} {...data} />;
          })}
      </div>
    </div>
  );
}

function ImageComponent({ imageUrl, user_name }) {
  return (
    <div className="single_response">
      <img height={300} width={300} src={imageUrl} />
      <div className="name">{user_name}</div>
    </div>
  );
}

export default App;
