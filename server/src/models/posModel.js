const pool = require("../config/db");

const addPosHd = async (data, userId) => {
  const {
    paymentMethod,
    receiptOption,
    totalPrice,
    email,
    customerId,
    therapistId,
  } = data.formPaymentData;
  const { walkinName, walkinEmail, walkinContact } = data.formWalkinData;
  const discprint = data.discountShow;
  const query =
    "INSERT INTO poshd (transdate,  total_amount, payment_method, customerId, therapist_id,walkinname, walkinemail, walkincontactno,printdisc, enteredby, entereddate) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  const [result] = await pool.query(query, [
    new Date(),
    totalPrice,
    paymentMethod,
    customerId,
    therapistId,
    walkinName,
    walkinEmail,
    walkinContact,
    discprint,
    userId,
    new Date(),
  ]);
  return result.insertId;
};

const addPosLine = async (idPosHd, item, userId, itemId, packagecheck) => {
  const { name, price, amount, type, discount, discpercent, subPrice } = item;

  const query =
    "INSERT INTO poslines (posid, itemid, productcat,qty, unit_price, total_price,disc,discpercent, package,oriprice, enteredby, entereddate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  const [result] = await pool.query(query, [
    idPosHd,
    itemId,
    type || "Package",
    amount,
    price,
    subPrice,
    discount,
    discpercent,
    packagecheck,
    price * amount,
    userId,
    new Date(),
  ]);
  return result.insertId;
};

const getPosHdCusData = async (options = {}) => {
  let { page = 1, limit = 10, searchTerm = "", customerId } = options;

  const params = [customerId];
  const conditions = ["customerid = ?"];

  // Search (sesuaikan kolom yang mau dicari)
  // if (searchTerm) {
  //   conditions.push("(posnumber LIKE ? OR remark LIKE ?)");
  //   const searchValue = `%${searchTerm}%`;
  //   params.push(searchValue, searchValue);
  // }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // Query data
  let query = `
    SELECT *
    FROM poshd
    ${whereClause}
  `;

  const queryParams = [...params];

  if (page && limit) {
    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));
  }

  const [rows] = await pool.query(query, queryParams);

  // Query total count
  const countQuery = `
    SELECT COUNT(*) AS total
    FROM poshd
    ${whereClause}
  `;

  const [countResult] = await pool.execute(countQuery, params);
  const total = countResult[0].total;

  return {
    data: rows,
    total,
  };
};

const getPosLineCusData = async (id) => {
  const query = `SELECT * ,
    total_price AS subPrice, qty AS amount, oriprice AS price, disc AS discount FROM poslines JOIN poshd ON poslines.posid = poshd.posid JOIN products ON poslines.itemid=products.productid LEFT JOIN package on poslines.itemid=package.packageid WHERE poslines.posid = ?`;
  const [rows] = await pool.query(query, [id]);
  return rows;
};

module.exports = { addPosHd, addPosLine, getPosHdCusData, getPosLineCusData };
