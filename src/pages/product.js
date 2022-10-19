// global imports
import "../../src/toggleMenu.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";

import { addToCart } from "../cart/setupCart.js";

import {
  getElement,
  formatPrice,
  imageSelectorBasedOnViewport,
  productImageSelector,
  addLineBreakToProductName,
} from "../utils.js";
import { store } from "../store.js";

// select elements
const goBackBtn = getElement(".go-back-btn");
const productImageContainer = getElement(".product-image-container");
const productTitle = getElement(".product-title");
const productBody = getElement(".product-body");
const productPrice = getElement(".product-price");
const productQuantity = getElement(".quantity-number");
const overline = getElement(".overline");
const productQuantitySelector = getElement(".quantity-selector");
const cartBtn = getElement(".add-to-cart-btn");
const productFeature = getElement(".product-feature-body");
const boxList = getElement(".box-list");
const productGallery = getElement(".product-gallery");
const recommendationProducts = getElement(".recommendation-products");

// cart product
let productID;

//set initial quantity value to 1
let updatedQuantity = 1;
productQuantity.textContent = updatedQuantity;

const init = () => {
  const urlID = window.location.search;
  const product = store.find((item) => item.slug === urlID.slice(4));

  const {
    description,
    features,
    gallery: { first, second, third },
    includes,
    name,
    image,
    others,
    new: isNew,
    price,
    slug,
  } = product;

  productID = slug;
  let productImageSrc = `./src${image[productImageSelector()].slice(1)}`;
  let galleryArr = Array.of({ first }, { second }, { third });

  // if isNew is truthy, the product will display the "new product" overline. If falsy, the overline will not be displayed.
  let newProduct = isNew ? "new product" : "";

  let nameWithLineBreaks = addLineBreakToProductName(name);

  //   set values
  document.title = `${name.toUpperCase()} | Audiophile`;
  productImageContainer.innerHTML = `<img
                src="${productImageSrc}"
                alt="${name}"
                class="product-image"
              />`;
  productTitle.innerHTML = nameWithLineBreaks;
  productBody.textContent = description;
  overline.textContent = newProduct;
  productPrice.textContent = formatPrice(price);
  productFeature.innerHTML = features.replaceAll("\n", "<br/>");
  boxList.innerHTML = includes
    .map((boxItem) => {
      return `<li class="box-list-item">
                  <p class="box-item-quantity">${boxItem.quantity}x</p>
                  <p class="box-item-name">${boxItem.item}</p>
                </li>`;
    })
    .join("");
  productGallery.innerHTML = galleryArr
    .map((placement) => {
      let key = Object.keys(placement)[0];
      let url = `./src${placement[key][imageSelectorBasedOnViewport()].slice(
        1
      )}`;

      return `<img
            src="${url}"
            alt="${name}-${key}"
            class="gallery-${key}"
            />`;
    })
    .join("");

  recommendationProducts.innerHTML = others
    .map((other) => {
      const { slug, name, image } = other;

      let recommendationPreviewImage = `./src${image[
        imageSelectorBasedOnViewport()
      ].slice(1)}`;

      return `<article class="recommendation-product">
                <div class="recommendation-product-image-container">
                  <img
                    src="${recommendationPreviewImage}"
                    alt="${name}"
                    class="recommendation-product-image"
                  />
                </div>
                <div class="recommendation-product-text">
                  <h2 class="recommendation-product-title">${name}</h2>
                  <button class="btn">
                    <a href="./product.html?id=${slug}">See product</a>
                  </button>
              </article>`;
    })
    .join("");
};

productQuantitySelector.addEventListener("click", (e) => {
  if (e.target.classList.contains("product-quantity-increase")) {
    updatedQuantity = Number(productQuantity.textContent) + 1;
    productQuantity.textContent = updatedQuantity;
  } else if (e.target.classList.contains("product-quantity-decrease")) {
    if (Number(productQuantity.textContent) === 1) {
      updatedQuantity = 1;
    } else {
      updatedQuantity = Number(productQuantity.textContent) - 1;
    }
    productQuantity.textContent = updatedQuantity;
  }
});

cartBtn.addEventListener("click", () => {
  addToCart(productID, updatedQuantity);
});
window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", init);

goBackBtn.addEventListener("click", () => {
  window.history.go(-1);
});
