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

const updateEvaluation = async (id, idUser, data) => {
  try {
    const result = evaluation.updateDataEvaluation(id, idUser, data);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed update evaluation");
  }
};

const updateEvalanotate = async (id, idUser, data) => {
  try {
    const result = evaluation.updateDataEvalanotate(id, idUser, data);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed update evalanotate");
  }
};

const updateSessionNotes = async (id, idUser, data) => {
  try {
    const result = evaluation.updateDataSessionNotes(id, idUser, data);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed update evalanotate");
  }
};

const addEvaluationPainArea = async (evaluationId, data) => {
  try {
    const result = evaluation.addDataEvaluationPainArea(evaluationId, data);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed update evalanotate");
  }
};

const updateEvaluationPainArea = async (id, data) => {
  try {
    const result = evaluation.updateDataEvaluationPainArea(id, data);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed update evalanotate");
  }
};

const deleteDataEvaluation = async (id) => {
  try {
    const result = evaluation.deleteEvaluation(id);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed update evalanotate");
  }
};

const deleteDataEvalanotate = async (id) => {
  try {
    const result = evaluation.deleteEvalannotate(id);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed update evalanotate");
  }
};

const deleteDataPainAreas = async (id) => {
  try {
    const result = evaluation.deleteEvaluationPainAreas(id);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed update evalanotate");
  }
};

const deleteDataSession = async (id) => {
  try {
    const result = evaluation.deleteSessionNote(id);
    return result;
  } catch (error) {
    console.error("Service error:", error);
    throw new Error("Failed update evalanotate");
  }
};

module.exports = { addNewEvaluation, addNewEvalanotate, addNewSessionNotes, getEvaluationData, updateEvaluation, updateEvalanotate, updateSessionNotes, addEvaluationPainArea, updateEvaluationPainArea, deleteDataEvaluation, deleteDataEvalanotate, deleteDataPainAreas, deleteDataSession };
