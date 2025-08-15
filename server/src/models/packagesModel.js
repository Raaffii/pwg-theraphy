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
        noofsession: item.noofsession,
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

const getCusPackageData = async (id) => {
  const query = "select * from custpackages JOIN package ON custpackages.packageid=package.packageid JOIN packagedetails ON package.packageid = packagedetails.packageid JOIN products ON packagedetails.productid=products.productid  WHERE customerid= ?";
  const [rows] = await pool.query(query, [id]);

  const package = {};

  rows.forEach((item, index) => {
    if (!package[item.packageid]) {
      package[item.packageid] = {
        packageid: item.packageid,
        packagedesc: item.packagedesc,
        price: item.price,
        expiry_days: item.expiry_days,
        noofsession: item.noofsession,
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

const insertCusPackages = async (data, id) => {
  const { packageid, noofsession } = data;
  const query = "INSERT INTO custpackages (customerid,  packageid, purchase_date, expiry_date, origsessions, remainsessions) VALUES (?,?,?,?,?,?)";
  const [result] = await pool.query(query, [id, packageid, new Date(), new Date(), noofsession, noofsession]);
  return result.insertId;
};

module.exports = { getData, insertCusPackages, getCusPackageData };
