let inputElement = document.getElementById("inputBox");
inputElement.addEventListener("input", event => {
  const url = `https://demo.dataverse.org/api/search?q=${event.target.value}`;
  const fetchObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    const response = fetch(url, fetchObject)
      .then(data => data.json())
      .then(obj => console.log(obj, "obj**"));
    // console.log(response, "data");
    // const itemsLength = data;
    // console.log(itemsLength,'len');
  } catch (e) {
    console.log(e, "ErrorHappended");
  }
});
