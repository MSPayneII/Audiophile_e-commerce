import { imageSelectorBasedOnViewport } from "../src/utils.js";

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

      let nameWithLineBreaks;
      // allow me to add line breaks to the name value based on which product it is
      switch (name) {
        case "YX1 Wireless Earphones":
          nameWithLineBreaks = "YX1 Wireless<br/> Earphones";
          break;
        case "XX59 Headphones":
          nameWithLineBreaks = "XX59<br/> Headphones";
          break;
        case "XX99 Mark I Headphones":
          nameWithLineBreaks = "XX99 Mark I<br/> Headphones";
          break;
        case "XX99 Mark II Headphones":
          nameWithLineBreaks = "XX99 Mark II<br/> Headphones";
          break;
        case "ZX7 Speaker":
          nameWithLineBreaks = "ZX7<br/> Speaker";
          break;
        case "ZX9 Speaker":
          nameWithLineBreaks = "ZX9<br/> Speaker";
          break;
      }

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
