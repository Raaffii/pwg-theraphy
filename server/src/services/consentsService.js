const consent = require("../models/consentsModel");
const consentDevice = require("../models/consentsDeviceModel");

const storeConsents = async (data, idCustomer, idUser, therapistId) => {
  try {
    const resultid = await consent.insertConsent(
      data,
      idCustomer,
      idUser,
      therapistId,
    );
    await consentDevice.bulkConsentDevice(data.selectedDevices, resultid);
  } catch (error) {
    console.error("Failed to save consent:", error.message);

    throw new Error("Error while storing consent data");
  }
};

const updatesConsent = async (data, consentFrmId, idUser) => {
  try {
    await consent.updateConsent(data, consentFrmId, idUser);
    await consentDevice.deleteData(consentFrmId);
    await consentDevice.bulkConsentDevice(data.selectedDevices, consentFrmId);
  } catch (error) {
    console.error("Failed to save consent:", error.message);
    throw new Error("Error while storing consent data");
  }
};

const getData = async (options = {}) => {
  try {
    const data = await consent.getData(options);
    return data;
  } catch (error) {
    console.error("Failed to save consent:", error);

    throw new Error("Error while storing consent data");
  }
};

const getDataById = async (id) => {
  try {
    const data = await consent.getConsentById(id);
    return data;
  } catch (error) {
    console.error("Failed to save consent:", error.message);

    throw new Error("Error while storing consent data");
  }
};

const deleteDataByIds = async (id) => {
  const result = await consent.deleteDataById(id);
  return result;
};

module.exports = {
  storeConsents,
  getData,
  deleteDataByIds,
  getDataById,
  updatesConsent,
};
