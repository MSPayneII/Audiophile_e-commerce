const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    return null;
  }
};

const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
  return formattedPrice;
};

const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
};
const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

const imageSelectorBasedOnViewport = () => {
  // function sets the "category-product-image" size base on the user's viewport on initial page load. E.g., the "category-product-image" will display its tablet sizing if the user's viewport is between 768px and 1023px.

  let viewPort = "";
  if (window.innerWidth < 768) {
    viewPort = "mobile";
  } else if (1023 > window.innerWidth && window.innerWidth >= 768) {
    viewPort = "tablet";
  } else {
    viewPort = "desktop";
  }
  return viewPort;
};
const productImageSelector = () => {
  // function sets the "product-image" size base on the user's viewport on initial page load. E.g., the "category-product-image" will display its tablet sizing if the user's viewport is between 768px and 1023px.

  let viewPort = "";
  if (window.innerWidth < 768) {
    viewPort = "mobile";
  } else if (1438 > window.innerWidth && window.innerWidth >= 768) {
    viewPort = "tablet";
  } else {
    viewPort = "desktop";
  }
  return viewPort;
};

const updateProductNamePresentation = (productName) => {
  // This function abbreviates the product name from the data file

  switch (productName) {
    case "YX1 Wireless Earphones":
      productName = "yx1";
      break;
    case "XX59 Headphones":
      productName = "xx59";
      break;
    case "XX99 Mark I Headphones":
      productName = "xx99 mk I";
      break;
    case "XX99 Mark II Headphones":
      productName = "xx99 mk II";
      break;
    case "ZX7 Speaker":
      productName = "zx7";
      break;
    case "ZX9 Speaker":
      productName = "zx9";
      break;
  }
  return productName;
};

export {
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
  imageSelectorBasedOnViewport,
  productImageSelector,
  updateProductNamePresentation,
};
