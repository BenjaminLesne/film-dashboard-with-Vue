//this recursive function loop through each array element and add display none as inline style
function addDisplayNoneToElements(elements) {
  const lastIndex = elements.length - 1;
  elements[lastIndex].style.display = "none";

  //each run it remove the element that received the display none...
  const newElements = elements.pop();

  //...then call itself with the elements remaining as argument
  //if no element remaining, do nothing.
  if (newElements.length > 0) return addDisplayNoneToElements(newElements);
}

export default addDisplayNoneToElements;
