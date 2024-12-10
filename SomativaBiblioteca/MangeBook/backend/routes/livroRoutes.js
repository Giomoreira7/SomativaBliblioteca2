// routes/livroRoutes.js
const express = require('express');
const Livro = require('../models/livro');
const router = express.Router();

// Rota para cadastrar um livro
router.post('/', async (req, res) => {
  const { titulo, autor, descricao, anoPublicacao, genero, isbn, numeroCopias, capa } = req.body;

  try {
    const livro = new Livro({ titulo, autor, descricao, anoPublicacao, genero, isbn, numeroCopias, capa });
    await livro.save();
    res.status(201).json(livro);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao cadastrar livro', erro: err.message });
  }
});

// Rota para listar todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find();
    res.status(200).json(livros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao obter livros', erro: err.message });
  }
});

module.exports = router;
