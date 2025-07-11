const pool = require("../config/db");

const getData = async () => {
  const query = "select * from therapists";
  const [rows] = await pool.query(query);
  return rows;
};

const getDataByEmail = async (email) => {
  const query = `SELECT * FROM therapists JOIN accounts ON therapists.account_id = accounts.id WHERE accounts.email = ?`;
  const [rows] = await pool.query(query, [email]);
  return rows[0];
};

module.exports = { getData, getDataByEmail };
