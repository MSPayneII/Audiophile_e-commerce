// global imports
import "../../src/toggleMenu.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";

import { getElement } from "../utils.js";
import { store } from "../store.js";

import display from "../displayProducts.js";

const loading = getElement(".page-loading");

// all products from my store that have a category value of "speakers"
let speakers = store.filter((product) => product.category === "speakers");

let speakersListNewProductsFirst = []; // ensures new products are first in the list

speakers.forEach((speaker) => {
  speaker.new
    ? speakersListNewProductsFirst.unshift(speaker)
    : speakersListNewProductsFirst.push(speaker);
});

// displays the products on initial page load
display(
  speakersListNewProductsFirst,
  getElement(".speaker-products-preview-section")
);

loading.style.display = "none";

//displays products with adjust image sizes as the browser is resized
window.addEventListener("resize", () => {
  display(
    speakersListNewProductsFirst,
    getElement(".speaker-products-preview-section")
  );
});
