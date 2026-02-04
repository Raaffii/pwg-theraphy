const pool = require("../config/db");

const getData = async () => {
  const query = "select * from products WHERE productcat = 'Service'";
  const [rows] = await pool.query(query);

  return rows;
};

module.exports = { getData };
