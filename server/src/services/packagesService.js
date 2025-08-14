const packages = require("../models/packagesModel");

const getPackagesData = async () => {
  const response = await packages.getData();
  return response;
};

module.exports = { getPackagesData };
