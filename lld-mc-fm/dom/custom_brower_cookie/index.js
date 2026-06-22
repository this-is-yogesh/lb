/**
 * Create a custom implementation of document.myCookie that behaves similarly to browser cookies.

Setting document.myCookie with "key=value" should store a cookie.
An optional max-age attribute should specify the cookie's lifetime in seconds.
Expired cookies should not appear when document.myCookie is read.
document.myCookie = "blog=learnersbucket";
document.myCookie = "name=prashant;max-age=1";

console.log(document.myCookie);
// "blog=learnersbucket; name=prashant"

setTimeout(() => {
  console.log(document.myCookie);
}, 1500);
// "blog=learnersbucket"
 */

let document = {};
let myCookie = {};

Object.defineProperty(document, "myCookie", {
  get() {
    return Object.entries(myCookie)
      .filter(([key, obj]) => {
        if (obj.expiry && obj.expiry <= Date.now()) {
          delete myCookie[key];
          return false;
        }
        return true;
      })
      .map(([key, obj]) => {
        return `${key}=${obj.value}`;
      })
      .join("; ");
  },
  set(cookieValue) {
    const [cookie, expiry] = cookieValue.split(";");
    const [key, value] = cookie.split("=");
    myCookie[key] = {
      value: value,
      expiry: expiry ? Date.now() + Number(expiry.split("=")[1]) * 1000 : null,
    };
  },
});

document.myCookie = "blog=learnersbucket";
document.myCookie = "name=prashant;max-age=1";
document.myCookie = "blogName=praveen;max-age=3";

//setTimeout to check the cookies after 1.5 seconds, if we will not setTimeout then we will get all the cookies because the max-age of name cookie is 1 second and we are checking after 1.5 seconds so it will be expired and it will not be shown in the output.
setTimeout(() => {
  console.log(document.myCookie);
}, 4000);