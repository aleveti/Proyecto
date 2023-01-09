const pool = require('../db');

const getAllemployee = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM employee WHERE status = 'Y'");
        res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
};

const getemployee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM employee WHERE employee_id = $1 AND status = 'Y'", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el empleado' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

const createemployee = async (req, res, next) => {
    const { employee_id, photo_id, profile_picture, cash } = req.body;

    try {
        const result = await pool.query("INSERT INTO employee (employee_id, photo_id, profile_picture, available, cash, status) VALUES ($1, $2, $3, 'Y', $4, 'Y') RETURNING *", [employee_id, photo_id, profile_picture, cash]);
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }

}

const deleteemployee = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await pool.query("UPDATE employee SET status = 'N' WHERE employee_id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el empleado' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

const updateemployee = async (req, res, next) => {
    const { id } = req.params;
    const { photo_id, profile_picture, available, cash } = req.body;
    try{
        const result = await pool.query("UPDATE employee SET photo_id = $1, profile_picture = $2, available = $3, cash = $4 WHERE employee_id = $5 RETURNING *", [photo_id, profile_picture, available, cash, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No existe el empleado' })
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    getAllemployee,
    getemployee,
    createemployee,
    deleteemployee,
    updateemployee
}