const DOMNodeCollection = require("./dom_node_collection");
const MyPromise = require('./my_promise.js');

window.$l = function(arg){
  if (typeof arg === "string"){
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  }
  if (arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  }
  if (arg instanceof Function) {
    document.addEventListener("DOMContentLoaded", arg);
  }
};

window.$l.extend = function (mergedObject, ...objects) {
  for (let i = 0; i < objects.length; i++) {
    const keys = Object.keys(objects[i]);
    keys.forEach((key) => {
      mergedObject[key] = objects[i][key];
    });
  }
  return mergedObject;
};

window.$l.ajax = (options) => (function () {
  const defaults = {
    method: "GET",
    dataType: "json",
    processData: true,
    StatusCode: {},
    url: document.URL,
    async: true,
    cache: true,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    crossDomain: false,
    global: true,
    headers: {},
    ifModified: false,
    isLocal: true,
    data: {},
    success: () => {},
    error: () => {},
  };

  window.$l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(defaults.method, defaults.url);
  xhr.onload = defaults.success;
  xhr.onerror = defaults.error;
  return MyPromise(xhr.send);
});
