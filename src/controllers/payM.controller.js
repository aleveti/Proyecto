const pool = require('../db');

const getAllPayMethod = async (req, res, next) => {

  try {
    const result = await pool.query("SELECT * FROM payment_method WHERE status = 'Y'");
    res.json(result.rows)
  } catch (error) {
    next(error);
  }
};

const getPayMethod = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM payment_method WHERE payment_id = $1 AND status = 'Y'", [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const createPayMethod = async (req, res, next) => {
  const { cvv, card_number, card_type, expiration_date, user_id } = req.body;

  try {
    const result = await pool.query("INSERT INTO payment_method (cvv, card_number, card_type, expiration_date, user_id, status) VALUES ($1, $2, $3, $4, $5,'Y') RETURNING *", [cvv, card_number, card_type, expiration_date, user_id]);

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const getPayMethodPerson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM payment_method WHERE user_id = $1 AND status = 'Y'", [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

//
const getPayMethodValidation = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await pool.query("SELECT * FROM payment_method WHERE card_number = $1 AND status = 'Y'", [id])
    if (result.rows.length > 0) {
      return res.json({ message: true });
    }
    return res.json({ message: false });
  } catch (error) {
    next(error);
  }
}

const deletePayMethod = async (req, res, next) => {

  const { id } = req.params;
  try {
    const result = await pool.query("UPDATE payment_method SET status = 'N' WHERE payment_id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    res.json(result.rows[0]);
  }
  catch (error) {
    next(error);
  }
}

const updatePayMethod = async (req, res, next) => {

  try {
    const { id } = req.params;
    const { cvv, card_number, card_type, expiration_date } = req.body;

    const result = await pool.query(
      'UPDATE payment_method SET cvv = $1, card_number = $2, card_type = $3, expiration_date = $4 WHERE payment_id = $5 RETURNING *', [cvv, card_number, card_type, expiration_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    //console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPayMethod,
  getPayMethod,
  getPayMethodPerson,
  getPayMethodValidation,
  createPayMethod,
  deletePayMethod,
  updatePayMethod
}