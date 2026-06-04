1. how to use select
       <select
          id="page"
          onChange={e => {
            selectingValue(e.target.value);
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>