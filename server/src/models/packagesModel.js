const pool = require("../config/db");

const getData = async () => {
  const query = "select * from package JOIN packagedetails ON package.packageid = packagedetails.packageid JOIN products ON packagedetails.productid=products.productid";
  const [rows] = await pool.query(query);

  const package = {};

  rows.forEach((item, index) => {
    if (!package[item.packageid]) {
      package[item.packageid] = {
        packageid: item.packageid,
        packagedesc: item.packagedesc,
        price: item.price,
        expiry_days: item.expiry_days,
        productInfo: [],
      };
    }

    package[item.packageid].productInfo.push({
      name: item.name,
      productcat: item.productcat,
      unitprice: item.unitprice,
      baseprice: item.baseprice,
      packageprice: item.packageprice,
      description: item.description,
    });
  });

  console.log("package", package);
  return Object.values(package);
};

module.exports = { getData };
