// import
import {
  getStorageItem,
  formatPrice,
  getElement,
  updateProductNamePresentation,
} from "../src/utils.js";

//select elements
const confirmationOverlay = getElement(".confirmation-overlay");
const confirmationItems = getElement(".confirmation-items");
const body = getElement("body");
const backHomeBtn = getElement(".back-home-btn");
const confirmListCtrlContainer = getElement(".confirmation-list-control");
const confirmListCtrlBtn = getElement(".confirmation-list-control-btn");
const confirmationTotal = getElement(".confirmation-total");

backHomeBtn.addEventListener("click", () => {
  console.log("continue btn clicked");

  if (confirmationOverlay.classList.contains("show")) {
    confirmationOverlay.classList.remove("show");
    body.classList.remove("no-scroll");
  }
});

// the confirmation modal list of products
const init = () => {
  let cart = getStorageItem("cart");
  let cartTotal = cart.reduce((cartTotal, cartItem) => {
    return (cartTotal += cartItem.price * cartItem.amount);
  }, 0);

  confirmationTotal.textContent = `${formatPrice(cartTotal)}`;

  // iterate over cart items to display in confirmation modal
  let items = cart.map((product) => {
    const { price, image, amount } = product;

    let cartImage = `./src${image["mobile"].slice(1)}`;

    let { name } = product;

    name = updateProductNamePresentation(name);

    return `
  <article class="confirmation-item">
  <img
                src="${cartImage}"
                alt="${name}"
                class="confirmation-item-image"
              />

              <div>
                <h4 class="confirmation-item-name">${name}</h4>
                <p class="confirmation-item-price">${formatPrice(price)}</p>
              </div>

              <div>
                  <p class="quantity-number confirmation-item-number">x${amount}</p>
                </div>
              </div></article>
  `;
  });

  if (items.length === 1) {
    confirmationItems.innerHTML = items[0];
    confirmListCtrlContainer.style.display = "none";
  } else if (items.length > 1) {
    let divElement = document.createElement("div");
    divElement.classList.add("additional-items");

    confirmListCtrlContainer.style.display = "grid";
    divElement.innerHTML = items.slice(1).join("");
    confirmationItems.innerHTML = items[0];
    confirmationItems.appendChild(divElement);

    let additionalItems = document.querySelector(".additional-items");
    additionalItems.style.display = "grid";

    confirmListCtrlBtn.addEventListener("click", () => {
      if (additionalItems.style.display === "grid") {
        additionalItems.style.display = "none";
        confirmListCtrlBtn.textContent = `and ${
          items.length - 1
        } other item(s)`;
      } else if (additionalItems.style.display === "none") {
        additionalItems.style.display = "grid";
        confirmListCtrlBtn.textContent = "view less";
      }
    });
  }
};

init();
