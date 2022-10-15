// global imports
import "../../src/toggleMenu.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";

import { getElement } from "../utils.js";
import { store } from "../store.js";

import display from "../displayProducts.js";

const loading = getElement(".page-loading");

// all products from my store that have a category value of "speakers"
let headphones = store.filter((product) => product.category === "headphones");

let headphonesListNewProductsFirst = []; // ensures new products are first in the list

headphones.forEach((headphone) => {
  headphone.new
    ? headphonesListNewProductsFirst.unshift(headphone)
    : headphonesListNewProductsFirst.push(headphone);
});

// displays the products on initial page load
display(
  headphonesListNewProductsFirst,
  getElement(".headphone-products-preview-section")
);
loading.style.display = "none";

//displays products with adjust image sizes as the browser is resized
window.addEventListener("resize", () => {
  display(
    headphonesListNewProductsFirst,
    getElement(".headphone-products-preview-section")
  );
});
