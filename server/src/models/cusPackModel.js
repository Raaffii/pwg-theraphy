const pool = require("../config/db");

const deleteCustPack = async (id) => {
  const sql = `
    DELETE FROM custpackages
    WHERE customerid = ?
  `;

  const [result] = await pool.query(sql, [id]);

  return result.affectedRows;
};

module.exports = { deleteCustPack };
