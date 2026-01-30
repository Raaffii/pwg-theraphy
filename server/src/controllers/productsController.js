const productsService = require("../services/productsService");

const fs = require("fs");
const path = require("path");

const getProducts = async (req, res) => {
  try {
    const data = await productsService.getDataProducts();
    res.status(200).json(data);
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

      // 2. Rename file di folder uploads
      fs.renameSync(`uploads/${tempFilename}`, `uploads/${newFilename}`);

      const data = { ...req.body, image: newFilename };

      // 3. Update nama file di DB
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
    console.log("celce", id);
    const data = await productsService.deleteProducts(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching  data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    console.log("data", data);
    console.log("file", req.file);

    if (req.file) {
      const tempFilename = req.file.filename;
      const ext = path.extname(tempFilename);
      const newFilename = `product-${id}${ext}`;

      // Hapus file lama jika ada

      const oldFilePath = path.join(
        __dirname,
        "../../uploads",
        `product-${id}`,
      );
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      // Rename file baru
      fs.renameSync(`uploads/${tempFilename}`, `uploads/${newFilename}`);

      // Update nama file di data
      data.image = newFilename;
    }

    // 3️⃣ Update database
    const result = await productsService.updateProducts(id, data);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProducts, postProducts, deleteProducts, updateProducts };
