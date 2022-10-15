// global imports
import "../../src/toggleMenu.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";

import { getElement } from "../utils.js";
import { store } from "../store.js";

import display from "../displayProducts.js";

const loading = getElement(".page-loading");

// all products from my store that have a category value of "speakers"
let earphones = store.filter((product) => product.category === "earphones");

let earphonesListNewProductsFirst = []; // ensures new products are first in the list

earphones.forEach((earphone) => {
  earphone.new
    ? earphonesListNewProductsFirst.unshift(earphone)
    : earphonesListNewProductsFirst.push(earphone);
});

// displays the products on initial page load
display(
  earphonesListNewProductsFirst,
  getElement(".earphone-products-preview-section")
);

loading.style.display = "none";

//displays products with adjust image sizes as the browser is resized
window.addEventListener("resize", () => {
  display(
    earphonesListNewProductsFirst,
    getElement(".earphone-products-preview-section")
  );
});
