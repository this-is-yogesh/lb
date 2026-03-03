import { useState, useEffect, memo } from "react";
import "./App.css";

function App() {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  function makeApiCall() {
    fetch(`https://api.unsplash.com/photos?page=${page}&per_page=${10}`, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        let listOfObj = data.map(d => {
          let singleObj = {
            id: d.id,
            imageUrl: d.urls.small,
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
  }, [page]);

  return (
    <div>
      <button onClick={() => setLoading(prev => !prev)}>Toggle Loading</button>
      <div className="area">
        <label htmlFor="page">Page</label>
        <select id="page" onChange={e => setPage(e.target.value)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        {responseData?.length > 0 &&
          responseData?.map(data => {
            /**1-- {..data} is good way to pass props
             */
            return <ImageComponent key={data.id} {...data} />;
          })}
      </div>
    </div>
  );
}

const ImageComponent = memo(function ({ id, imageUrl, user_name }) {
  {/**3-- memo does wonders */}
  console.log("ImageComponent rendered", id);
  return (
    <div className="single_response">
      {/**
       * 2-- very important to add lazy loading*/}
      <img height={300} width={300} src={imageUrl} loading="lazy" />
      <div className="name">{id}</div>
    </div>
  );
});

export default App;
