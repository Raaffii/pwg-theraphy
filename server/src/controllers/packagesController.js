const packagesService = require("../services/packagesService");

const getPackages = async (req, res) => {
  try {
    const data = await packagesService.getPackagesData();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getPackages };
