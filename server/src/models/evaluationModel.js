const pool = require("../config/db");

const addEvaluation = async (id, idUser, data) => {
  const { medication, medication_detail, uncomfortable_pain, note_session, therapist, theraphy, duration, date } = data;
  const query = "INSERT INTO evaluations (customer_id,  therapist_id,therapy_type,  date, enteredby, entereddate, active) VALUES (?,?,?,?,?,?,?)";
  console.log(idUser);
  const [result] = await pool.query(query, [id, therapist, theraphy, date, idUser, new Date(), true]);
  return result.insertId;
};

const addEvalanotate = async (id, idUser, evaluatioId, data) => {
  const { frontx, fronty, backx, backy } = data;
  const query = "INSERT INTO evalannotate (bodyfrontx_percent, bodyfronty_percent, bodybackx_percent, bodybacky_percent,customerid, entereddate, editedby, evaluationid) VALUES (?,?,?,?,?,?,?,?)";
  await pool.query(query, [frontx, fronty, backx, backy, id, new Date(), idUser, evaluatioId]);
};

const addSessionNotes = async (id, idUser, evaluatioId, data) => {
  const { duration, medication, medication_detail, uncomfortable_pain, therapist, note_session } = data;
  const query = "INSERT INTO session_notes (customer_id,therapists_id, evaluation_id, duration_minutes, on_medication, medication_details, therapist_note, enteredby, entereddate) VALUES (?,?,?,?,?,?,?,?,?) ";
  await pool.query(query, [id, therapist, evaluatioId, duration, medication, medication_detail, note_session, idUser, new Date()]);
};

const getEvaluation = async (id) => {
  const query = `
    SELECT * FROM session_notes JOIN evaluations ON session_notes.evaluation_id = evaluations.id WHERE evaluations.customer_id = ?`;
  const [rows] = await pool.query(query, [id]);

  return rows;
};

module.exports = { addEvaluation, addEvalanotate, addSessionNotes, getEvaluation };
