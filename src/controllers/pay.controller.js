const pool = require('../db');

const getAllPay = async (req, res, next) => {

  try {
    const result = await pool.query("SELECT * FROM pay");
    res.json(result.rows)
  } catch (error) {
    next(error);
  }
};

const getPay = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM pay WHERE pay_id = $1", [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const pendingPay = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM service S INNER JOIN PAY P ON S.service_id = P.service_id AND S.status = 'Y' AND P.status = 'N' WHERE user_id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: false });
    }
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

const createPay = async (req, res, next) => {
  const { employee_pay, profit_mande, total_payment, pay_date, service_id } = req.body;

  try {
    const result = await pool.query("INSERT INTO pay ( employee_pay, profit_mande, total_payment, pay_date, status, service_id) VALUES ($1, $2, $3, $4, 'N', $5) RETURNING *", [employee_pay, profit_mande, total_payment, pay_date, service_id]);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const deletePay = async (req, res, next) => {

  const { id } = req.params;
  try {
    const result = await pool.query("UPDATE pay SET status = 'N' WHERE pay_id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    res.json(result.rows[0]);
  }
  catch (error) {
    next(error);
  }
}

const updatePay = async (req, res, next) => {

  try {
    const { id } = req.params;
    const { employee_pay, profit_mande, total_payment, pay_date, service_id } = req.body;

    const result = await pool.query(
      'UPDATE pay SET employee_pay = $1, profit_mande = $2, total_payment = $3, pay_date = $4, service_id =  $5 WHERE pay_id = $6 RETURNING *', [employee_pay, profit_mande, total_payment, pay_date, service_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    //console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

const paymentPay = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("UPDATE pay SET status = 'Y' WHERE service_id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPay,
  getPay,
  pendingPay,
  createPay,
  deletePay,
  updatePay,
  paymentPay
}