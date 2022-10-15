import { getElement } from "./utils.js";

//select elements
const toggleNav = getElement(".toggle-nav");
const overlay = getElement(".menu-overlay");
const body = getElement("body");

toggleNav.addEventListener("click", () => {
  console.log("clicked");

  if (overlay.classList.contains("show")) {
    overlay.classList.remove("show");
    body.classList.remove("no-scroll");
  } else {
    overlay.classList.add("show");
    body.classList.add("no-scroll");
  }
});
