const consentsService = require("../services/consentsService");
const customerService = require("../services/customerService");
const evaluationService = require("../services/evaluationService");
const custPackService = require("../services/custPageService");

const createConsents = async (req, res) => {
  try {
    let customerId = req.params.id;
    let userId = req.user.userId;
    const therapistId = req.user.therapistId;

    if (customerId == 0) {
      userId = null;
      customerId = null;
    }
    const result = await consentsService.storeConsents(
      req.body,
      customerId,
      userId,
      therapistId,
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

const updateConsents = async (req, res) => {
  try {
    const consentFrmId = req.params.id;
    const result = await consentsService.updatesConsent(
      req.body,
      consentFrmId,
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

const getConsents = async (req, res) => {
  try {
    let { page, pageSize, searchTerm } = req.query;

    const result = await consentsService.getData({
      page,
      limit: pageSize,
      searchTerm,
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

const getConsentsById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await consentsService.getDataById(id);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching  data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteById = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await consentsService.deleteDataByIds(id);
    const evaluationIds = await evaluationService.getByCustomerId(id);

    await evaluationService.deleteEvalonatateBulk(evaluationIds);
    await evaluationService.deleteEvaluationPainAreasBulk(evaluationIds);
    await evaluationService.deleteSessionNoteBulk(evaluationIds);

    await evaluationService.deleteByCustomerId(id);
    await custPackService.deleteCustPack(id);

    await customerService.deleteById(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error Delete data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createConsents,
  getConsents,
  deleteById,
  getConsentsById,
  updateConsents,
};
