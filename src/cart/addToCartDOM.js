import {
  formatPrice,
  getElement,
  updateProductNamePresentation,
} from "../utils.js";

const cartItems = getElement(".cart-items");

const addToCartDOM = (product) => {
  const { slug, price, image, amount } = product;

  let { name } = product;

  name = updateProductNamePresentation(name);

  let cartImage = `./src${image["mobile"].slice(1)}`;

  const article = document.createElement("article");

  article.classList.add("cart-item");
  article.setAttribute("data-id", slug);
  article.innerHTML = ` <img
                src="${cartImage}"
                alt="${name}"
                class="cart-item-image"
              />

              <div>
                <h3 class="cart-item-name">${name}</h3>
                <p class="cart-item-price">${formatPrice(price)}</p>
              </div>

              <div>
                <div class="quantity-selector cart-quantity-selector">
                  <button class="decrease-quantity" data-id="${slug}">-</button>

                  <p class="quantity-number" data-id="${slug}">${amount}</p>
                  <button class="increase-quantity" data-id="${slug}">+</button>
                </div>
              </div>`;
  cartItems.appendChild(article);
};

export default addToCartDOM;
