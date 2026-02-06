const posService = require("../services/posService");

const insertPosHd = async (req, res) => {
  try {
    const result = await posService.posInsertHd(req.body, req.user.userId);

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
    const result = await posService.posInsertLine(
      req.body.idResult,
      req.body.selectedData,
      req.user.userId,
    );

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

const getCusPosHd = async (req, res) => {
  try {
    let { page, pageSize, searchTerm, customerId } = req.query;

    const result = await posService.getCustomerPosHd({
      page,
      limit: pageSize,
      searchTerm,
      customerId,
    });

    res.status(200).json({
      success: true,
      message: "Registration successful",
      data: result,
      pagination: {
        currentPage: Number(page),
        pageSize: Number(pageSize),
        totalPages: Math.ceil(result.total / pageSize),
        totalItems: result.total,
      },
    });
  } catch (error) {
    console.error("Error Get Data:", error);

    res.status(500).json({
      success: false,
      message: "Evaluation Error",
      error: error.message,
    });
  }
};

const getCusPosLine = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await posService.getCustomerPosLine(id);

    res.status(200).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    console.error("Error Get Data:", error);

    res.status(500).json({
      success: false,
      message: "Evaluation Error",
      error: error.message,
    });
  }
};

const getPosSetup = async (req, res) => {
  try {
    const result = await posService.getPosSetup();

    res.status(200).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    console.error("Error Get Data:", error);

    res.status(500).json({
      success: false,
      message: "Evaluation Error",
      error: error.message,
    });
  }
};

module.exports = {
  insertPosHd,
  insertPosLine,
  getCusPosHd,
  getCusPosLine,
  getPosSetup,
};
