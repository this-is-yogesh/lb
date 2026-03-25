const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

console.log(get(obj, "a.b.c"));
console.log(get(obj, "a.b.c.0"));
console.log(get(obj, "a.b.c[1]"));
console.log(get(obj, "a.b.c[3]"));
console.log(get(obj, "a.b"));

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
