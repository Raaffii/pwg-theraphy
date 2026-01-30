const pool = require("../config/db");
const getData = async () => {
  const query = `SELECT * FROM products`;
  const [row] = await pool.query(query);
  return row;
};

const postProducts = async (data) => {
  const { productName, unitPrice, typeProduct } = data;
  console.log("here", data);
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
  const { productName, unitPrice, typeProduct, image } = data;

  const sql = `
    UPDATE products 
    SET name = ?, unitprice = ?, productcat = ?, picture = ?
    WHERE productid = ?
  `;

  const [result] = await pool.query(sql, [
    productName,
    unitPrice,
    typeProduct,
    image,
    id,
  ]);

  return result;
};

module.exports = { getData, postProducts, deleteProduct, updateProduct };
