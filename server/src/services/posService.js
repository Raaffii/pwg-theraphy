const pos = require("../models/posModel");
const posSetup = require("../models/posSetupModel");

const posInsertHd = async (data, userId) => {
  try {
    console.log("dataaaaa", data);
    const dataPosSetup = await posSetup.getPosSetup();

    const invnumber = Number(dataPosSetup.nextinvnum) + 1;

    const mergeData = {
      ...data,
      invnumber: invnumber,
    };

    const result = await pos.addPosHd(mergeData, userId);

    await posSetup.updatePosSetup(dataPosSetup.setupid, invnumber);

    return result;
  } catch (error) {
    console.error("Failed to save consent:", error.message);
    throw new Error("Error while storing consent data");
  }
};

const getPosSetup = async () => {
  try {
    const dataPosSetup = await posSetup.getPosSetup();
    return dataPosSetup;
  } catch (error) {
    console.error("Failed to Pos Setup:", error.message);
    throw new Error("Error while storing consent data");
  }
};

const posInsertLine = async (idPosHd, data, userId) => {
  try {
    let result;
    data.forEach((item) => {
      if (item.packageid) {
        result = pos.addPosLine(idPosHd, item, userId, item.packageid, 1);
      } else {
        result = pos.addPosLine(idPosHd, item, userId, item.id, 0);
      }
    });

    return result;
  } catch (error) {
    console.error("Failed to save consent:", error.message);
    throw new Error("Error while storing consent data");
  }
};

const getCustomerPosHd = async (options = {}) => {
  try {
    const result = await pos.getPosHdCusData(options);
    return result;
  } catch (error) {
    console.error("Failed to save consent:", error.message);
    throw new Error("Error while storing consent data");
  }
};

const getCustomerPosLine = async (id) => {
  try {
    const result = await pos.getPosLineCusData(id);
    return result;
  } catch (error) {
    console.error("Failed to save consent:", error.message);
    throw new Error("Error while storing consent data");
  }
};

module.exports = {
  posInsertHd,
  posInsertLine,
  getCustomerPosHd,
  getCustomerPosLine,
  getPosSetup,
};
