import { getElement } from "../utils.js";

//select elements
const cartOverlay = getElement(".cart-overlay");
const toggleCartBtn = getElement(".toggle-cart");
const body = getElement("body");

toggleCartBtn.addEventListener("click", () => {
  console.log("cart btn clicked");

  if (cartOverlay.classList.contains("show")) {
    cartOverlay.classList.remove("show");
    body.classList.remove("no-scroll");
  } else {
    cartOverlay.classList.add("show");
    body.classList.add("no-scroll");
  }
});

export const openCart = () => {
  cartOverlay.classList.add("show");
};
