// import
import { getElement } from "../src/utils.js";

// select elements
const cashDeliveryInfoDOM = getElement(".cash-on-delivery-info-section");
const cashChoiceContainer = getElement(".cash-input-container");
const cashRadioChoice = getElement("#cash");
const eMoneyInfoDOM = getElement(".e-money-info-section");
const eMoneyChoiceContainer = getElement(".e-money-input-container");
const eMoneyRadioChoice = getElement("#e-money");

const displayPaymentSelectionChoices = () => {
  // this function hightlights radio button container and displays relevant form sections when a radio button is selected

  let radioBtns = document.querySelectorAll('input[type="radio"]');

  radioBtns.forEach((radioBtn) => {
    radioBtn.addEventListener("change", () => {
      if (cashRadioChoice.checked) {
        cashChoiceContainer.classList.add("radio-btn-container-highlight");
        cashDeliveryInfoDOM.style.display = "flex";
        eMoneyChoiceContainer.classList.remove("radio-btn-container-highlight");
        eMoneyInfoDOM.style.display = "none";
      } else if (eMoneyRadioChoice.checked) {
        eMoneyChoiceContainer.classList.add("radio-btn-container-highlight");
        eMoneyInfoDOM.style.display = "grid";
        cashChoiceContainer.classList.remove("radio-btn-container-highlight");
        cashDeliveryInfoDOM.style.display = "none";
      }
    });
  });
};

// select form inputs
const name = getElement("#name");
const email = getElement("#email");
const telephone = getElement("#telephone");
const address = getElement("#address");
const zipcode = getElement("#zipcode");
const city = getElement("#city");
const country = getElement("#country");
const eMoneyRadio = getElement("#e-money");
const cashRadio = getElement("#cash");
const eMoneyNumber = getElement("#e-money-number");
const eMoneyPin = getElement("#e-money-pin");

const getFieldName = (input) => {
  return `${input.name.charAt(0).toUpperCase()}${input.id.slice(1)}`;
};

const checkInputValidation = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      inputSuccess(input);
    }
  });
};

const showError = (input, message) => {
  // show error for invalid form input values
  let errorMsg = input.previousElementSibling;
  let label = input.parentElement;
  errorMsg.classList.add("label-error-color");
  errorMsg.style.display = "inline";
  label.classList.add("label-error-color");
  input.classList.add("input-error-border-color");
  errorMsg.textContent = message;
};

const inputSuccess = (input) => {
  let errorMsg = input.previousElementSibling;
  let label = input.parentElement;
  errorMsg.style.display = "none";
  errorMsg.textContent = "";

  errorMsg.classList.remove("label-error-color");
  label.classList.remove("label-error-color");
  input.classList.remove("input-error-border-color");
};

const checkValidEmail = (input) => {
  const regularExpression =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (regularExpression.test(input.value.trim())) {
    inputSuccess(input);
  } else {
    showError(input, "Valid email is required");
  }
};

const isValidPhoneNum = (input) => {
  const regularExpression =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  if (regularExpression.test(input.value)) {
    inputSuccess(input);
  } else {
    showError(input, "10 digit number required");
  }
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `Must be at least ${min} digits`);
  } else if (input.value.length > max) {
    showError(input, `Must be less than least ${max} digits`);
  } else {
    inputSuccess(input);
  }
};

const isShowErrorPresent = (inputArr) => {
  let confirmation = true;
  inputArr.forEach((input) => {
    let errorMsg = input.previousElementSibling;
    if (errorMsg.style.display === "inline") {
      confirmation = false;
      return;
    }
  });
  return confirmation;
};

export {
  displayPaymentSelectionChoices,
  showError,
  checkValidEmail,
  checkInputValidation,
  isValidPhoneNum,
  checkLength,
  isShowErrorPresent,
};
