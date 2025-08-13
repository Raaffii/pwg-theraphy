const posService = require("../services/posService");

const insertPosHd = async (req, res) => {
  try {
    const result = await posService.posInsertHd(req.body, req.user.userId);
    console.log("serres", result);

    res.status(200).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const insertPosLine = async (req, res) => {
  try {
    const result = await posService.posInsertLine(req.body.idResult, req.body.selectedData, req.user.userId);

    res.status(200).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

module.exports = { insertPosHd, insertPosLine };
