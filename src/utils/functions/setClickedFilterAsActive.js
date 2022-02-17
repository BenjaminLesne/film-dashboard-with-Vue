async function setClickedFilterAsActive(clickedFilter) {
  const currentActiveFilter = document.querySelector(".active");

  currentActiveFilter.classList.remove("active");

  //set clicked filter as active filter
  clickedFilter.classList.add("active");
}

export default setClickedFilterAsActive;
