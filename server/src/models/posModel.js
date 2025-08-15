const pool = require("../config/db");

const addPosHd = async (data, userId) => {
  const { paymentMethod, receiptOption, totalPrice, email, customerId, therapistId } = data.formPaymentData;
  const { walkinName, walkinEmail, walkinContact } = data.formWalkinData;
  const discprint = data.discountShow;
  const query = "INSERT INTO poshd (transdate,  total_amount, payment_method, customerId, therapist_id,walkinname, walkinemail, walkincontactno,printdisc, enteredby, entereddate) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  const [result] = await pool.query(query, [new Date(), totalPrice, paymentMethod, customerId, therapistId, walkinName, walkinEmail, walkinContact, discprint, userId, new Date()]);
  return result.insertId;
};

const addPosLine = async (idPosHd, item, userId, itemId, packagecheck) => {
  const { name, price, amount, type, discount, discpercent } = item;

  let totalprice;
  if (discpercent) {
    const discountCut = price * (discount / 100);
    console.log("discount", discount);
    console.log("discountcut", discountCut);
    console.log("price", price);
    console.log("amount", amount);
    totalprice = amount * (price - discountCut);
  } else {
    totalprice = price - discount;
  }

  console.log("item", item);
  const query = "INSERT INTO poslines (posid, itemid, productcat,qty, unit_price, total_price,disc,discpercent, package, enteredby, entereddate) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  const [result] = await pool.query(query, [idPosHd, itemId, type || "Package", amount, price, totalprice, discount, discpercent, packagecheck, userId, new Date()]);
  return result.insertId;
};

module.exports = { addPosHd, addPosLine };
