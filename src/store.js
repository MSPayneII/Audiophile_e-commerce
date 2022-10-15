import { getStorageItem, setStorageItem } from "./utils.js";

let store = getStorageItem("store");

const setupStore = (products) => {
  store = products.map((product) => {
    const {
      category,
      categoryImage,
      description,
      features,
      gallery,
      id,
      image,
      includes,
      name,
      new: isNew,
      others,
      price,
      slug,
    } = product;

    return {
      category,
      categoryImage,
      description,
      features,
      gallery,
      id,
      image,
      includes,
      name,
      new: isNew,
      others,
      price,
      slug,
    };
  });
  setStorageItem("store", store);
};

const findProduct = (slug) => {
  let product = store.find((product) => product.slug === slug);
  return product;
};
export { store, setupStore, findProduct };
