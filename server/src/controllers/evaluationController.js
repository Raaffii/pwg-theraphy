const evaluationService = require("../services/evaluationService");

const addEvaluation = async (req, res) => {
  try {
    const id = req.params.id;
    const idUser = req.user.userId;
    const evaluationId = await evaluationService.addNewEvaluation(id, idUser, req.body);
    await evaluationService.addNewEvalanotate(id, idUser, evaluationId, req.body);
    await evaluationService.addNewSessionNotes(id, idUser, evaluationId, req.body);
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Add Evaluation:", error);

    res.status(500).json({
      success: false,
      message: "Evaluation Error",
      error: error.message,
    });
  }
};

const getEvaluation = async (req, res) => {
  try {
    console.log("here");
    const id = req.params.id;
    const result = await evaluationService.getEvaluationData(id);

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

module.exports = { addEvaluation, getEvaluation };
