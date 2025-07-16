const evaluation = require("../models/evaluationModel");

const addNewEvaluation = async (id, idUser, data) => {
  try {
    const result = evaluation.addEvaluation(id, idUser, data);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed add evaluation");
  }
};
const addNewEvalanotate = async (id, idUser, evaluationId, data) => {
  try {
    const result = evaluation.addEvalanotate(id, idUser, evaluationId, data);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed add evaluation");
  }
};

const addNewSessionNotes = async (id, idUser, evaluationId, data) => {
  try {
    const result = evaluation.addSessionNotes(id, idUser, evaluationId, data);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed add evaluation");
  }
};

const getEvaluationData = async (id) => {
  try {
    const result = evaluation.getEvaluation(id);

    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed add evaluation");
  }
};

module.exports = { addNewEvaluation, addNewEvalanotate, addNewSessionNotes, getEvaluationData };
