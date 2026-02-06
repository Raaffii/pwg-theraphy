const pool = require("../config/db");

const getPosSetup = async () => {
  const query = `SELECT * FROM possetup ps`;
  const [rows] = await pool.query(query);
  return rows[0];
};

const updatePosSetup = async (id, nextinvnumber) => {
  const query = `
    UPDATE possetup
    SET nextinvnum = ?
    WHERE setupid = ?
  `;

  const [result] = await pool.query(query, [nextinvnumber, id]);

  return result.affectedRows;
};

module.exports = { getPosSetup, updatePosSetup };
