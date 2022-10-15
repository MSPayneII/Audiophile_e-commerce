// global imports
import "./src/toggleMenu.js";
import "./src/cart/toggleCart.js";
import "./src/cart/setupCart.js";

import { setupStore } from "./src/store.js";

import data from "./data.json" assert { type: "json" };

const init = () => {
  const products = data;
  if (products) {
    setupStore(products);
  } else {
    throw new Error("There was an issue retrieving the data");
  }
};

window.addEventListener("DOMContentLoaded", init);
