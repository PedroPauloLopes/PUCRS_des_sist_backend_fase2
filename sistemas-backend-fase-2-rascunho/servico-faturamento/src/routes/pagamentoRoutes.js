const express = require('express');
const router = express.Router();

const pagamentoController = require('../controllers/pagamentoController');

router.post('/registrarpagamento', pagamentoController.registrarPagamento);

module.exports = router;
