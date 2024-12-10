const express = require('express');
const router = express.Router();

// Importando o controlador de dashboard
const dashboardController = require('../controllers/dashboardController');

// Rota GET para retornar o status do dashboard
router.get('/', dashboardController.getDashboardData);

module.exports = router;
