import { useState, useEffect, useRef } from "react";

const paginationLength = new Array(8).fill(1);
const limit = 10;
export default function Pagination() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [skip, setSkip] = useState(0);

  let styles = getStyles();
  const timerRef = useRef(null);

  useEffect(() => {
    debouncedFn(query);
  }, [query, skip]);

  function debounce(fn, timer) {
    return query => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        console.log(query, "query**");
        fn(query);
      }, timer);
    };
  }
  let debouncedFn = debounce(getProducts, 1000);

  async function getProducts(query) {
    console.log(query, "queryGET");
    setLoading(true);
    try {
      let res;
      if (query.length) {
        res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`,
        );
      } else {
        res = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        );
      }
      const data = await res.json();
      setProducts(data.products);
    } catch (e) {
      setError("API failed" + e);
    } finally {
      setLoading(false);
    }
  }

  function paginationClick(idx) {
    setLoading(true);
    setQuery("");
    let skip = idx * limit - 10;
    console.log(idx * limit, skip);
    setSkip(skip);
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <h3>Search Products</h3>
      <div>
        <input
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div>
        <select
          id="page"
          onChange={e => {
            paginationClick(e.target.value);
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
        {loading && <div>Loading...</div>}
        {products &&
          products?.map((prd, index) => (
            <div key={index} style={styles.card}>
              <span>Id: {prd.id}</span>
              <span>Name : {prd.title}</span>
              <span>Stock : {prd.stock}</span>
            </div>
          ))}
      </div>

      <div style={styles.pagnationButtons}>
        {paginationLength.map((_, index) => (
          <button
            style={styles.button}
            key={index}
            onClick={() => paginationClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

function getStyles() {
  return {
    card: {
      display: "flex",
      flexDirection: "column",
      margin: "20px 0px",
      //  minWidth: "90%",
      border: "0.5px solid red",
      padding: "20px",
    },
    pagnationButtons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      margin: "20px 0px",
    },
    button: {
      border: "none",
      padding: "10px",
      borderRadius: "10%",
      cursor: "pointer",
    },
  };
}
