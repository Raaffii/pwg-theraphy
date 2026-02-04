const pool = require("../config/db");

const bulkConsentDevice = async (selectedDevices, resultid) => {
  if (!selectedDevices.length) return;

  const values = selectedDevices.map((device) => [resultid, device.id]);

  const sql = `
    INSERT INTO consentdevice (consentfrmid, device_used)
    VALUES ?
  `;

  const [result] = await pool.query(sql, [values]);

  return result.affectedRows;
};

const deleteData = async (consentFrmId) => {
  const sql = `
    DELETE FROM consentdevice
    WHERE consentfrmid = ?
  `;

  const [result] = await pool.query(sql, [consentFrmId]);

  return result.affectedRows;
};

module.exports = { bulkConsentDevice, deleteData };
