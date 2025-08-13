const pool = require("../config/db");

const addPosHd = async (data, userId) => {
  console.log("ceeceecee");
  const { paymentMethod, receiptOption, totalPrice, email, customerId, therapistId } = data;
  const query = "INSERT INTO poshd (transdate,  total_amount, payment_method, customerId, therapist_id, enteredby, entereddate) VALUES (?,?,?,?,?,?,?)";
  const [result] = await pool.query(query, [new Date(), totalPrice, paymentMethod, customerId, therapistId, userId, new Date()]);
  return result.insertId;
};

const addPosLine = async (idPosHd, item, userId) => {
  const { name, id, price, amount, type } = item;
  const query = "INSERT INTO poslines (posid, itemid, productcat,qty, unit_price, total_price, enteredby, entereddate) VALUES (?,?,?,?,?,?,?,?)";
  const [result] = await pool.query(query, [idPosHd, id, type, amount, price, amount * price, userId, new Date()]);
  return result.insertId;
};

module.exports = { addPosHd, addPosLine };
