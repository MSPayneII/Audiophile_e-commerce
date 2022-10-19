import {
  imageSelectorBasedOnViewport,
  addLineBreakToProductName,
} from "../src/utils.js";

const display = (products, element) => {
  // function to display products associated with a category.
  // parameters: a list of objects (products), the html element the products will display inside of. E.g, headphones will display on the headphone.html page
  element.innerHTML = products
    .map((product) => {
      const { categoryImage, description, new: isNew, slug } = product;

      // adds "./src" to the image url so it matches my file structure since my assets folder is housed within src
      let image = `./src${categoryImage[imageSelectorBasedOnViewport()].slice(
        1
      )}`;

      let { name } = product;

      let nameWithLineBreaks = addLineBreakToProductName(name);

      // if isNew is truthy, the product will display the "new product" overline. If falsy, the overline will not be displayed.
      let newProduct = isNew ? `<p class="overline">new product</p>` : "";

      return ` <article class="product-preview">
            <div class="product-preview-image-container">
              <img
                src="${image}"
                alt="${name}"
                class="product-preview-image"
              />
            </div>
            <div class="product-preview-text">
            ${newProduct}
              <h2 class="product-preview-title">${nameWithLineBreaks}</h2>
              <p class="product-preview-body">
                ${description}
              </p>
              <button class="btn">
                <a href="./product.html?id=${slug}">See product</a>
              </button>
            </div>
          </article>`;
    })
    .join("");
};

export default display;
