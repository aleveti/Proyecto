const {Router} = require('express');
const {getAllPay, getPay, createPay, deletePay, updatePay} = require('../controllers/pay.controller.js');

const router = Router();

router.get('/pay', getAllPay);

router.get('/pay/:id', getPay);

router.post('/pay', createPay);

router.put('/pay/delete/:id', deletePay);

router.put('/pay/:id', updatePay);

module.exports = router;