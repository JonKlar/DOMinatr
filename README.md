DOMinatr is a custom tool designed to be a lightweight solution to standardizing DOM manipulation across browsers


| [Public API](#public-api) |

# Public API
- [selector()](#d-selector)
- [html()](#htmlstring)
- [empty()](#empty)
- [attr()](#attrattributename-value)
- [addClass()](#addclassclassname)
- [removeClass()](#removeclassclassname)
- [append()](#appendcontent)
- [children()](#children)
- [parent()](#parent)
- [find()](#findselector)
- [remove()](#remove)
- [on()](#oneventtype-callback)
- [off()](#offeventtype)
- [ajax](#ajax)

## $l (selector)
### Creates and returns a DOMinatr Object

Selecting DOM Elements
```javascript
$l("div.class");
```
Wrapping HTML Elements
```javascript
const newDiv = document.createElement("div");
$l(newDiv)
```
Queue callbacks to run when DOM Content has finished loading
```javascript
$l(() => alert("content has loaded!"));
```
## DOMinatr Methods

### html(string)
Sets the inner HTML of all selected elements
```html
<p class="paragraph"></p>
```

```javascript
$l("p.paragraph").html("hello world");
```

```html
<p class="paragraph">hello world</p>
```
Returns the inner HTML of the first element in a collection
```html
<p class="paragraph">hello world</p>
```

```javascript
$l("p.paragraph").html("hello world");
//-> "hello world"
```
### empty()
Deletes all child elements of the collection elements
```html
<ul class="emptyMe">
  <li>Hello</li>
  <li>World</li>
</ul>
```

```javascript
$l("ul.emptyMe").empty();
```

```html
<ul class="emptyMe">
</ul>
```

### attr(attributeName, value)
Gets value of attribute for first Element in colllection OR sets value for attribute of all elements in collection
```html
<img src="" alt="hello">
<img src="" alt="">
<img src="" alt="">
```

```javascript
$l("img").attr("alt");
//-> "hello"
$l("img").attr("alt", "goodbye");
```

```html
<img src="" alt="goodbye">
<img src="" alt="goodbye">
<img src="" alt="goodbye">
```
### addClass(className)
Adds a class name to every element in the collection
```html
<div class="hello"></div>
<div class="hello"></div>
```

```javascript
$l("div.hello").addClass("world");
```

```html
<div class="hello world"></div>
<div class="hello world"></div>
```
### removeClass(className)
Removes a class name from every element in the collection
```html
<div class="hello world"></div>
<div class="hello world"></div>
```

```javascript
$l("div.hello").removeClass("hello");
```

```html
<div class="world"></div>
<div class="world"></div>
```
### append(content)
Appends content to every element of the collection in accordance to type of input content given
```html
<p></p>
<p></p>
<p></p>
```

```javascript
$l("p").append("hello");
```

```html
<p>hello</p>
<p>hello</p>
<p>hello</p>
```

```javascript
$l("p").append(document.createElement("div"));
```

```html
<p>hello<div></div></p>
<p>hello<div></div></p>
<p>hello<div></div></p>
```
### children()
Returns a new collection containing the child elements of the elements in the original collection.
```html
<ul>
  <li></li>
  <li></li>
</ul>
```

```javascript
$l("ul").children();
//<li></li>
//<li></li>
```
### parent()
```html
<div>
  <p></p>
</div>
```

```javascript
$l("p").parent();
//<div></div>
```
### find(selector)
Searches all elements in the collection for children that match the input selector.
```html
<div>
  <p class="hello"></p>
  <section></section>
  <aside class="side"></aside>
</div>
```

```javascript
$l("div").find("aside.side");
//<aside class="side"></aside>
```
### remove()
Removes all elements of the collection from the DOM and empties the collection.
```html
<div>
  <p></p>
  <section></section>
</div>
```

```javascript
$l("div").remove();
```

```html
```
### on(eventType, callback)
Adds an event listener with the given type and callback to all elements of the collection
```javascript
$l("button.hello").on("click", () => alert("hello"));
```
### off(eventType)
Removes the event listeners for a given type from all elements of the collection
```javascript
$l("button.hello").off("click");
```

### $.ajax(options)
Creates an HTTP request object based on options inputs, then runs the success or error Methods
```javascript
defaults = {
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
```
