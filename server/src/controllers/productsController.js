const productsService = require("../services/productsService");

const fs = require("fs");
const path = require("path");

const getProducts = async (req, res) => {
  try {
    let { page, pageSize, searchTerm, filter } = req.query;

    const result = await productsService.getDataProducts({
      page,
      limit: pageSize,
      searchTerm,
      filter,
    });

    res.status(200).json({
      data: result.data,
      pagination: {
        currentPage: Number(page),
        pageSize: Number(pageSize),
        totalPages: Math.ceil(result.total / pageSize),
        totalItems: result.total,
      },
    });
  } catch (error) {
    console.error("Error fetching  data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const postProducts = async (req, res) => {
  try {
    const data = await productsService.postProducts(req.body);

    const insertId = data;
    if (req.file) {
      const tempFilename = req.file.filename;
      const ext = path.extname(tempFilename);

      newFilename = `product-${insertId}${ext}`;

      fs.renameSync(`uploads/${tempFilename}`, `uploads/${newFilename}`);

      const data = { ...req.body, picture: newFilename };

      await productsService.updateProducts(insertId, data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching  data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productsService.getProductById(id);

    const data = await productsService.deleteProducts(id);

    const oldFilePath = path.join(__dirname, "../../uploads", product.picture);

    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }

    res.status(200).json(data);
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        message:
          "Cannot delete this product because it is linked to transacton data.",
      });
    } else {
      return res
        .status(500)
        .json({ message: "Internal server error", error: "Error Server" });
    }
  }
};

const updateProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const product = await productsService.getProductById(id);

    if (req.file) {
      const tempFilename = req.file.filename;
      const ext = path.extname(tempFilename);
      const newFilename = `product-${id}${ext}`;

      const oldFilePath = path.join(
        __dirname,
        "../../uploads",
        `product-${product.picture}`,
      );
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      fs.renameSync(`uploads/${tempFilename}`, `uploads/${newFilename}`);

      data.picture = newFilename;
      console.log("data", data.picture);
    }

    const result = await productsService.updateProducts(id, data);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProducts, postProducts, deleteProducts, updateProducts };
