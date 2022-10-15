// global imports
import "../toggleMenu.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
import "../confirmationModal.js";

// import
import {
  getStorageItem,
  formatPrice,
  getElement,
  updateProductNamePresentation,
} from "../utils.js";

import {
  displayPaymentSelectionChoices,
  checkValidEmail,
  checkInputValidation,
  isValidPhoneNum,
  checkLength,
  isShowErrorPresent,
} from "../form.js";

// select elements
// const continuePayBtn = getElement(".continue-to-pay-btn");
const goBackBtn = getElement(".go-back-btn");
const summaryItems = getElement(".summary-items");
const initialTotal = getElement(".initial-total");
const shippingTotal = getElement(".shipping");
const vatTotal = getElement(".vat");
const grandTotal = getElement(".grand");
const checkoutForm = getElement("#checkout-form");

// form elements
const name = getElement("#name");
const email = getElement("#email");
const telephone = getElement("#telephone");
const address = getElement("#address");
const zipcode = getElement("#zipcode");
const city = getElement("#city");
const country = getElement("#country");
const eMoneyRadio = getElement("#e-money");
// const cashRadio = getElement("#cash");
const eMoneyNumber = getElement("#e-money-number");
const eMoneyPin = getElement("#e-money-pin");

const init = () => {
  let cart = getStorageItem("cart");
  let cartTotal = cart.reduce((cartTotal, cartItem) => {
    return (cartTotal += cartItem.price * cartItem.amount);
  }, 0);

  let shipping = 50;
  initialTotal.textContent = `${formatPrice(cartTotal)}`;
  shippingTotal.textContent = `${formatPrice(shipping)}`;
  vatTotal.textContent = `${formatPrice(cartTotal * 0.2)}`;
  grandTotal.textContent = `${formatPrice(cartTotal + shipping)}`;

  // iterate over cart items to display in summary
  summaryItems.innerHTML = cart
    .map((product) => {
      const { price, image, amount } = product;

      let { name } = product;

      let cartImage = `./src${image["mobile"].slice(1)}`;

      name = updateProductNamePresentation(name);

      return `
  <article class="summary-item">
  <img
                src="${cartImage}"
                alt="${name}"
                class="summary-item-image"
              />

              <div>
                <h4 class="summary-item-name">${name}</h4>
                <p class="summary-item-price">${formatPrice(price)}</p>
              </div>

              <div>
                  <p class="quantity-number summary-item-number">x${amount}</p>
                </div>
              </div></article>
  `;
    })
    .join("");
};

goBackBtn.addEventListener("click", () => {
  window.history.go(-1);
});

// form relate functions
displayPaymentSelectionChoices();

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputGrp1 = [name, email, telephone, address, zipcode, city, country];
  let inputGrp2 = [eMoneyNumber, eMoneyPin];

  window.scrollTo(0, 0);

  checkValidEmail(email);
  checkInputValidation(inputGrp1);
  isValidPhoneNum(telephone);
  checkLength(zipcode, 5, 10);

  let noErrorsGrp1 = isShowErrorPresent(inputGrp1);
  let noErrorsGrp2 = true;

  if (eMoneyRadio.checked) {
    checkInputValidation(inputGrp2);
    checkLength(eMoneyNumber, 9, 17);
    checkLength(eMoneyPin, 4, 6);
    noErrorsGrp2 = isShowErrorPresent(inputGrp2);
  }

  //if form is successfully submitted with all inputs being valid
  if (noErrorsGrp1 && noErrorsGrp2) {
    getElement(".confirmation-overlay").classList.add("show");
    getElement("body").classList.add("no-scroll");
  }
});

init();
