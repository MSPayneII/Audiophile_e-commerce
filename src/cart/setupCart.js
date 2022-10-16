// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";

import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
import { openCart } from "./toggleCart.js";

let cart = getStorageItem("cart");

// select elements
const cartItemsCount = getElement(".cart-item-count");
const cartItems = getElement(".cart-items");
const cartTotal = getElement(".cart-total");
const clearCartBtn = getElement(".clear-cart-btn");
const checkOutBtn = getElement(".cart-checkout-btn");

export const addToCart = (productSlug, productQuantity) => {
  let item = cart.find((cartItem) => cartItem.slug === productSlug);

  if (!item) {
    let product = findProduct(productSlug);

    //add item to the cart
    product = { ...product, amount: productQuantity };
    cart = [...cart, product];
    //add item to the DOM
    addToCartDOM(product);
  } else {
    //update values
    const amount = addMoreQuantity(productSlug, productQuantity);
    const items = [...cartItems.querySelectorAll(".quantity-number")];
    const newAmount = items.find((value) => value.dataset.id === productSlug);
    // console.log(newAmount);
    newAmount.textContent = amount;
    openCart();
  }

  // add one to the item count
  displayCartItemCount();
  // display cart totals
  displayCartTotal();
  // set cart in local storage
  setStorageItem("cart", cart);
  // checks cart items length handles checkout btn
  cartBtnCheck();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemsCount.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  cartTotal.textContent = `${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

function addMoreQuantity(slug, quantity) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.slug === slug) {
      newAmount = cartItem.amount + quantity;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function increaseAmount(slug) {
  console.log("increase btn clicked");
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.slug === slug) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(slug) {
  console.log("decrease btn clicked");

  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.slug === slug) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function removeItem(id) {
  cart = cart.filter((product) => product.slug !== id);
}

function cartBtnCheck() {
  // This function checks the length of cart items and sets the href of the checkout btn/link to void(0) if there are zero items in the cart

  if (cartItems.querySelectorAll("article").length < 1) {
    checkOutBtn.firstElementChild.href = "javascript: void(0)";
    checkOutBtn.classList.add("disabled");
  } else {
    checkOutBtn.firstElementChild.href = "./checkout.html";
    checkOutBtn.classList.remove("disabled");
  }
}

function setupCartFunctionality() {
  clearCartBtn.addEventListener("click", function (e) {
    [...cartItems.querySelectorAll("article")].forEach((item) => item.remove()); //removes every item from the cart dom element
    cart = [];
    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
    cartBtnCheck();
  });

  cartItems.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;

    //increase
    if (e.target.classList.contains("increase-quantity")) {
      const newAmount = increaseAmount(id);
      e.target.previousElementSibling.textContent = newAmount;
    }

    //decrease
    if (e.target.classList.contains("decrease-quantity")) {
      const newAmount = decreaseAmount(id);
      if (newAmount === 0) {
        removeItem(id);
        parent.parentElement.parentElement.remove();
      } else {
        e.target.nextElementSibling.textContent = newAmount;
      }
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
    cartBtnCheck();
  });
}

const init = () => {
  // display amount of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  // add all cart items to the DOM
  displayCartItemsDOM();
  // setup cart functionality
  setupCartFunctionality();
  // checks cart items length handles checkout btn
  cartBtnCheck();
};

init();
