const products = require("../models/productsModel");

const getDataProducts = async (options = {}) => {
  try {
    const data = await products.getData(options);
    return data;
  } catch (error) {
    console.error("Failed to save consent:", error.message);

    throw new Error("Error while storing consent data");
  }
};

const postProducts = async (data) => {
  try {
    const result = await products.postProducts(data);
    return result;
  } catch (error) {
    console.error("Failed to save consent:", error.message);

    throw new Error("Error while storing consent data");
  }
};

const deleteProducts = async (id) => {
  try {
    const result = await products.deleteProduct(id);
    return result;
  } catch (error) {
    console.error("Failed to save consent:", error.message);

    throw error;
  }
};

const updateProducts = async (id, data) => {
  try {
    const result = await products.updateProduct(id, data);
    return result;
  } catch (error) {
    console.error("Failed to save consent:", error.message);

    throw new Error("Error while storing consent data");
  }
};

const getProductById = async (id) => {
  try {
    const data = await products.getProductById(id);
    return data;
  } catch (error) {
    console.error("Failed to save consent:", error.message);

    throw new Error("Error while storing consent data");
  }
};

module.exports = {
  getDataProducts,
  postProducts,
  deleteProducts,
  updateProducts,
  getProductById,
};
