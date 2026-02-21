## Answers to Questions
### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
-The main difference between them is getElementById selects one element by its id, getElementsbyClassName gives us the HTML collection of that perticular class, querySelector gives us the element macthing any valid css selector and finally querySelectorAll returns all elements matching the CSS selector.

### 2. How do you create and insert a new element into the DOM?
step 1- create a new div element.
const createDiv = document.createElement("div");

step 2- Set the inner text to any string or any functionality wanted.
createDiv.innerText = "hello world";

step 3- append it as the last child of body section/parent section.
document.body.appendChild(createDiv);

### 3. What is Event Bubbling? And how does it work?
-In DOM, Event Bubbling is a propagation mechanism where if event triggred on a child bubbles up through its parents elements, all the ways to the document and window.
-If a button inside a div is clicked, the click event triggred on the button first as it is the child, then it bubbles up to the div, then to body, html, document, and finally window.

### 4. What is Event Delegation in JavaScript? Why is it useful?
Event Delegation is a pattern used to handle events efficiently by attaching a single event listener to a parent element instead of adding listeners to multiple similar child elements, and then identifying the actual source of the event using the event.target property.

It is usefull to-
1.Reduces the number of event listeners.
2.Improves performance and memory usage.
4.Ideal for dynamically added elements.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
-preventDefault: Stops the browser's default action.
-stopPropagation(): Stops the event from bubbling up to parent elements.