const pos = require("../models/posModel");

const posInsertHd = async (data, userId) => {
  try {
    const result = await pos.addPosHd(data, userId);
    return result;
  } catch (error) {
    console.error("Failed to save consent:", error.message);
    throw new Error("Error while storing consent data");
  }
};

const posInsertLine = async (idPosHd, data, userId) => {
  try {
    let result;
    data.forEach((item) => {
      result = pos.addPosLine(idPosHd, item, userId);
    });

    return result;
  } catch (error) {
    console.error("Failed to save consent:", error.message);
    throw new Error("Error while storing consent data");
  }
};

module.exports = { posInsertHd, posInsertLine };
