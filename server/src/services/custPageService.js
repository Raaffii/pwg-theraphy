const custPack = require("../models/cusPackModel");

const deleteCustPack = async (id) => {
  const response = await custPack.deleteCustPack(id);

  return response;
};

module.exports = {
  deleteCustPack,
};
