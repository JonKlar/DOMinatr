class DOMNodeCollection {
  constructor(elements){
    this.elements = elements;
    this.listeners = {};
  }

  html(parameter) {
    if(typeof parameter === 'undefined') {
      return this.elements[0].innerHTML;
    }
    else{
      this.elements.forEach((element) => {
        element.innerHTML = parameter;
      });
    }
  }

  empty(){
    this.html("");
  }

  append(arg) {
    let appendString = "";
    if (arg instanceof DOMNodeCollection){
      arg.elements.forEach((element) => {
        appendString += element.outerHTML;
      });
    } else if (arg instanceof HTMLElement) {
      appendString += arg.outerHTML;
    } else if (typeof arg === "string") {
      appendString += arg;
    }
    this.elements.forEach((element) => {
      element.innerHTML += appendString;
    });
  }

  attr(name, value) {
    if (value === undefined) {
      const results = [];
      this.elements.forEach( (el) => {
        results.push(el.getAttribute(name));
      });
      return results;
    } else {
      this.elements.forEach ( (el) => {
        el.setAttribute(name, value);
      });
    }
  }

  addClass(className) {
    this.elements.forEach( (el) => {
      let classString = el.classList;
      if (classString === null) {
        el.setAttribute("class", className);
      } else {
        el.setAttribute("class", classString + " " + className);
      }
    });
  }

  removeClass(className) {
    this.elements.forEach( (el) => {
      const classString = el.classList;
      if (classString !== null) {
        let classArray= classString.split(" ");
        if (classArray.includes(className)) {
          const deleteIdx = classArray.indexOf(className);
          classArray.splice(deleteIdx, 1);
          if (classArray.length < 1) {
            el.removeAttribute("class");
          } else {
            el.setAttribute("class", classArray.join(" "));
          }
        }
      }
    });
  }

  toggleClass(toggleClass) {
   this.elements.forEach( (el) => {
     let classString = el.classList;
     let classArray= classString.split(" ");
     if (classArray.includes(toggleClass)) {
       this.removeClass(toggleClass);
     } else {
       this.addClass(toggleClass);
     }
   });
 }


  children() {
    const result = [];
    this.elements.forEach((el) => {
      Array.from(el.children).forEach((child) => {
      result.push(child);
      });
    });
    return new DOMNodeCollection(result);
  }

  parent() {
    const result = [];
    this.elements.forEach((el) => {
      result.push(el.parentElement);
    });
    return new DOMNodeCollection(result);
  }

  find(selector) {
    let results = [];
    this.elements.forEach( (el) => {
      if (this.elements.indexOf(el.parentElement) === -1 ) {
        results = results.concat(Array.from(el.querySelectorAll(selector)));
      }
    });
    return new DOMNodeCollection(results);
  }

  remove(selector) {
    const newElements = [];
    let searchEls = this;
    if(selector !== undefined) {
      searchEls = this.find(selector);
    }
    this.elements.forEach( (el) => {
      if (searchEls.elements.indexOf(el) > -1) {
        el.remove();
      } else {
        newElements.push(el);
      }
    });
    this.elements = newElements;
  }

  on(handledEvent, callback) {
    this.elements.forEach((el) => {
     el.addEventListener(handledEvent, callback);
     const eventKey = `DOMinatrEvents-${handledEvent}`;
     if (typeof el[eventKey] === "undefined") {
       el[eventKey] = [];
     }
     el[eventKey].push(callback);
   });
  }

  off(handledEvent) {
    this.elements.forEach((el) => {
      const eventKey = `DOMinatrEvents-${handledEvent}`;
      if (el[eventKey]) {
        el[eventKey].forEach(callback => {
          el.removeEventListener(handledEvent, callback);
        });
      }
      el[eventKey] = [];
    });
  }
}


module.exports = DOMNodeCollection;
