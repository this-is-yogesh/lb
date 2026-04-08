import { useState, useEffect, memo } from "react";
import "./App.css";

const PER_PAGE = 10;
function App() {
  const [responseData, setResponseData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  function makeApiCall() {
    let searchWord = !searchValue ? "" : searchValue;
    fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=${PER_PAGE}&query=${searchWord}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      },
    )
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

  function makeSearchApiCall() {
    fetch(
      `https://api.unsplash.com/search/photos?page=${page}&per_page=${PER_PAGE}&query=${searchValue}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        let listOfObj = data?.results?.map(d => {
          let singleObj = {
            id: d.id,
            imageUrl: d.urls.small,
            user_name: d.user?.name,
          };
          return singleObj;
        });
        console.log(listOfObj?.length, "listOfObjSearch**");
        setResponseData(listOfObj);
      });
  }
  useEffect(() => {
    if (searchValue) {
      makeSearchApiCall();
    } else {
      makeApiCall();
    }
  }, [page, searchValue]);

  return (
    <div>
      <div className="area">
        {/**4-- how to use select option  */}
        <div className="selet_page">
          <label htmlFor="page">Page</label>
          <select id="page" onChange={e => setPage(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
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
  {
    /**3-- memo does wonders */
  }
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
