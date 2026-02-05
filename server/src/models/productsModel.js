const pool = require("../config/db");
const getData = async (options = {}) => {
  let { page = 1, limit = 10, searchTerm = "", filter } = options;

  const params = [];
  const conditions = [];

  if (searchTerm) {
    conditions.push("products.name like ? ");
    const searchValue = `%${searchTerm}%`;
    params.push(searchValue);
  }

  if (filter) {
    conditions.push("products.productcat = ? ");
    params.push(filter);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  let query = `SELECT * FROM products ${whereClause}`;

  const queryParams = [...params];

  if (page && limit) {
    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));
  }

  const [row] = await pool.query(query, queryParams);

  const countQuery = `SELECT COUNT(*) AS total  FROM products ${whereClause} `;
  const [countResult] = await pool.execute(countQuery, [...params]);
  const total = countResult[0].total;

  return { data: row, total: total };
};

const getProductById = async (id) => {
  const query = `
    SELECT *
    FROM products
    WHERE productid = ?
    LIMIT 1
  `;

  const [rows] = await pool.execute(query, [id]);

  return rows[0];
};

const postProducts = async (data) => {
  const { productName, unitPrice, typeProduct } = data;

  const sql =
    "INSERT INTO products (name, unitprice, productcat) VALUES (?, ?, ?)";

  const [result] = await pool.query(sql, [productName, unitPrice, typeProduct]);

  return result.insertId;
};

const deleteProduct = async (productId) => {
  const sql = "DELETE FROM products WHERE productid = ?";

  const [result] = await pool.query(sql, [productId]);

  return result;
};

const updateProduct = async (id, data) => {
  const { productName, unitPrice, typeProduct, picture } = data;

  console.log("data", data);

  const sql = `
    UPDATE products 
    SET name = ?, unitprice = ?, productcat = ?, picture = ?
    WHERE productid = ?
  `;

  const [result] = await pool.query(sql, [
    productName,
    unitPrice,
    typeProduct,
    picture,
    id,
  ]);

  return result;
};

module.exports = {
  getData,
  postProducts,
  deleteProduct,
  updateProduct,
  getProductById,
};
