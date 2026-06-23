/**
// Implement a function that takes two parameters: an Object and a Path.
// It returns the value of the object following path
// Please Implement in JavaScript

get({ developer: "Software Engineer" }, "developer"); // => 'Software Engineer'
get({ developer: { firstName: "Tom", lastName: "Cruz" } }, "developer.lastName"); //=>'Cruz
get([{ developer: "Tom" }, { count: [0, 1] }], "[1].count[0]"); //=>0
get([{ developer: "Tom" }, [0, null]], "[1][1]"); //=>null
 */

function get(obj, path) {
let fullpath = ""

for(let i =0;i<path.length;i++){
if((path[i] >="0" && path[i]<="9")  || (path[i].toLowerCase()>="a" && path[i].toLowerCase()<="z")){
  fullpath +=path[i]
}else{
  fullpath +=" "
}
}
fullpath = fullpath
  .trim()
  .split(" ")
  .filter(val => val);

  function traverseObject(obj,i){
    if (i === fullpath.length) {
      return obj;
    }
    return traverseObject(obj[fullpath[i]], ++i);
  }
  console.log(traverseObject(obj,0),'ans')
}

get({ developer: "Software Engineer" }, "developer"); // => 'Software Engineer'
get(
  { developer: { firstName: "Tom", lastName: { trulyLast: "Cruz" } } },
  "developer.lastName.trulyLast"
); //=>'Cruz
 get([{ developer: "Tom" }, { count: [0, 1] }], "[1].count[0]"); //=>0
 get([{ developer: "Tom" }, [0, null]], "[1][1]"); //=>null
