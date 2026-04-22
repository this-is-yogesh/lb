const dom = {
  type: "div",
  props: { id: "hello" },
  children: [{ type: "h1", children: "Hello" }],
};

function generateDom(domObj, root) {
  function helper(obj) {
    let { type, children, props } = obj;
    let element = document.createElement(type);
    if (props) {
      for (let key in props) {
        element[key] = props[key];
      }
    }

    if (typeof children === "string") {
      element.textContent = children;
    } else if (Array.isArray(children)) {
      const fragment = document.createDocumentFragment();
      children.forEach(child => {
        fragment.appendChild(helper(child));
      });
      element.appendChild(fragment);
    }

    return element;
  }

  root.appendChild(helper(domObj));
}

generateDom(dom, document.getElementById("root"));
