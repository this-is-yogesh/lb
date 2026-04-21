let object = {};

const set = (object, pathString, value) => {
  let pathArr = pathString;
  if (typeof pathArr === "string") {
    pathArr = pathString.replaceAll("[", ".").replaceAll("]", "").split(".");
  }
  const helper = (obj, path, value) => {
    const [current, ...rest] = path;

    if (rest?.length > 0) {
      if (!obj[current]) {
        //check if value is number or not
        const isNumeric = `${+rest[0]}` === rest[0];
        obj[current] = isNumeric ? [] : {};
      }
      obj[current] = helper(obj[current], rest, value);
    } else {
      //if rest length is finished then here
      obj[current] = value;
    }
    return obj;
  };
  return helper(object, pathArr, value);
};

function get(obj, stringPath) {
  if (!stringPath || !stringPath.length) {
    return undefined;
  }

  let excludeCharacters = ["[", "]", "."];
  let keys = new Array();

  for (let i = 0; i < stringPath.length; i++) {
    if (!excludeCharacters.includes(stringPath[i])) {
      keys.push(stringPath[i]);
    }
  }
  return keys.reduce((obj, key) => {
    return obj[key];
  }, obj);
}
let obj = set(object, "a[0].b.c.d", 8);
console.log(get(object, "a[0].b.c.d"));
//console.dir("set->", set(object, "a[0].b.c.d", 9), { depth: null });
// console.log(object.a[0].b.c.d);
// object = {};
// console.log(set(object, ["x", "0", "y", "z"], 7));
// console.log(object.x[0].y.z);
