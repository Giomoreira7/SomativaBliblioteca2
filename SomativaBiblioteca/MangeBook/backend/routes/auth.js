const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Supondo que você tenha o modelo de usuário

const router = express.Router();

// Rota POST para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Verificar se o usuário já existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe' });
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar o novo usuário
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Salvar o novo usuário no banco de dados
  try {
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

module.exports = router;
