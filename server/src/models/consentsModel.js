const pool = require("../config/db");

const insertConsent = async (data, customer_id, user_id, therapistId) => {
  const now = new Date();

  const {
    date,
    therapist,
    walkin,
    voucherNo,
    gender,
    age,
    selectedDevices,
    breastImplant,
    pacemakerImplant,
    electronicMonitorImplant,
    metalImplant,
    eyeLensImplant,
    historyOfHeartBypass,
    nonWalkinContact,
    nonWalkinName,
    nonWalkin,
    otherCondition,
    issuecoheartdisease,
    issuelungdisease,
    issuediabetes,
    issuestrokehistory,
    issuehypertension,
    issuepregnant,
    issuecancer,
    issuemenstruating,
    issuesurgery,
    issuehospitalninetydays,
    issueseizure,
  } = data;

  const query = `INSERT INTO consentfrm 
  (customerid, therapistid,  voucherno,  gender, age, walkin, implantelecmon, 
  implantmetal, implanteyslens, issueheartbypass, implantbreast, implantpacemaker,nonwalkin, nonwalkincontact, 
  nonwalkinname,  consentfrmdate, entereddate, enteredby, issueothers,issuecoheartdisease, issuelungdisease, issuediabetes, issuestrokehistory, issuehypertension, issuepregnant, issuecancer, issuemenstruating, issuesurgery, issuehospitalninetydays,
  issueseizure ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  const [result] = await pool.query(query, [
    customer_id,
    therapistId,
    voucherNo,
    gender,
    age,
    walkin,
    electronicMonitorImplant,
    metalImplant,
    eyeLensImplant,
    historyOfHeartBypass,
    breastImplant,
    pacemakerImplant,
    nonWalkin,
    nonWalkinContact,
    nonWalkinName,
    date,
    now,
    user_id,
    otherCondition,
    issuecoheartdisease,
    issuelungdisease,
    issuediabetes,
    issuestrokehistory,
    issuehypertension,
    issuepregnant,
    issuecancer,
    issuemenstruating,
    issuesurgery,
    issuehospitalninetydays,
    issueseizure,
  ]);

  return result.insertId;
};

const getConsentById = async (customer_id) => {
  const query = `
    SELECT 
      consentfrm.*,
      customers.*,
      therapists.*,
      consentdevice.device_used,
      products.name as productname
    FROM consentfrm 
    JOIN customers 
      ON consentfrm.customerid = customers.customerid
    JOIN therapists 
      ON consentfrm.therapistid = therapists.therapistsid
    LEFT JOIN consentdevice 
      ON consentfrm.consentfrmid = consentdevice.consentfrmid
    LEFT JOIN products 
      ON consentdevice.device_used = products.productid
    WHERE consentfrm.customerid = ?
  `;

  const [rows] = await pool.query(query, [customer_id]);

  if (!rows.length) return null;

  const base = rows[0];

  const selectedDevices = rows
    .filter((r) => r.device_used !== null)
    .map((r) => ({
      id: r.device_used,
      name: r.productname,
    }));

  return {
    ...base,
    selectedDevices,
  };
};

const updateConsent = async (data, consentFrmId, user_id) => {
  const now = new Date();
  const {
    date,
    therapist,
    voucherNo,
    gender,
    age,
    selectedDevices,
    breastImplant,
    pacemakerImplant,
    electronicMonitorImplant,
    metalImplant,
    eyeLensImplant,
    historyOfHeartBypass,
    nonWalkinContact,
    nonWalkinName,
    otherCondition,
    issuecoheartdisease,
    issuelungdisease,
    issuediabetes,
    issuestrokehistory,
    issuehypertension,
    issuepregnant,
    issuecancer,
    issuemenstruating,
    issuesurgery,
    issuehospitalninetydays,
    issueseizure,
  } = data;

  const query = `
  UPDATE consentfrm SET
    therapistid = ?,
    voucherno = ?,
    gender = ?,
    age = ?,
    walkin = ?,
    implantelecmon = ?,
    implantmetal = ?,
    implanteyslens = ?,
    issueheartbypass = ?,
    implantbreast = ?,
    implantpacemaker = ?,
    nonwalkinname = ?,
    nonwalkincontact = ?,
    consentfrmdate = ?,
    editeddate = ?,
    editedby = ?,
    issueothers=?,
    issuecoheartdisease=?,
    issuelungdisease=?,
    issuediabetes=?,
    issuestrokehistory=?,
    issuehypertension=?,
    issuepregnant=?,
    issuecancer=?,
    issuemenstruating=?,
    issuesurgery=?,
    issuehospitalninetydays=?,
    issueseizure=?
  WHERE consentfrmid = ?
`;

  const [result] = await pool.query(query, [
    therapist,
    voucherNo,
    gender,
    age,
    1, // walkin
    electronicMonitorImplant,
    metalImplant,
    eyeLensImplant,
    historyOfHeartBypass,
    breastImplant,
    pacemakerImplant,
    nonWalkinName,
    nonWalkinContact,
    date,
    now,
    user_id,
    otherCondition,
    issuecoheartdisease,
    issuelungdisease,
    issuediabetes,
    issuestrokehistory,
    issuehypertension,
    issuepregnant,
    issuecancer,
    issuemenstruating,
    issuesurgery,
    issuehospitalninetydays,
    issueseizure,
    consentFrmId, // untuk WHERE
  ]);

  return result.affectedRows > 0;
};

const getData = async (options = {}) => {
  let { page = 1, limit = 10, searchTerm = "" } = options;

  const params = [];
  const conditions = [];

  if (searchTerm) {
    conditions.push("customers.name like ? ");
    const searchValue = `%${searchTerm}%`;
    params.push(searchValue);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  let query = `SELECT * FROM consentfrm JOIN 
  customers ON consentfrm.customerid = customers.customerid ${whereClause}`;

  const queryParams = [...params];
  if (page && limit) {
    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));
  }

  const [row] = await pool.query(query, queryParams);

  const countQuery = `SELECT COUNT(*) AS total  FROM consentfrm JOIN 
  customers ON consentfrm.customerid = customers.customerid ${whereClause} `;
  const [countResult] = await pool.execute(countQuery, [...params]);
  const total = countResult[0].total;

  return { data: row, total: total };
};

const deleteDataById = async (customer_id) => {
  const query = `DELETE FROM consentfrm WHERE customerid = ?;`;
  const [result] = await pool.query(query, [customer_id]);
  return result;
};
module.exports = {
  insertConsent,
  getConsentById,
  updateConsent,
  getData,
  deleteDataById,
};
