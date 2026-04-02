let object = {};


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
const set = (object, pathString, value) => {
  let pathArr = pathString;
  if (typeof pathArr === "string") {
    pathArr = pathString.replaceAll("[", ".").replaceAll("]", "").split(".");
  }

  return helper(object, pathArr, value);
};

console.dir("set->", set(object, "a[0].b.c.d", 9), { depth: null });
// console.log(object.a[0].b.c.d);
// object = {};
// console.log(set(object, ["x", "0", "y", "z"], 7));
// console.log(object.x[0].y.z);
