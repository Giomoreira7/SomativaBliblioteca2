// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para cadastro de usuário
router.post('/cadastrar', userController.createUser);

// Rota para login de usuário
router.post('/login', userController.loginUser);

module.exports = router;
