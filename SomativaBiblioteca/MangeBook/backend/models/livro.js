const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
  },
  autor: {
    type: String,
    required: [true, 'O autor é obrigatório'],
  },
  descricao: {
    type: String,
    required: [true, 'A descrição é obrigatória'],
  },
  anoPublicacao: {
    type: Number,
    required: [true, 'O ano de publicação é obrigatório'],
  },
  genero: {
    type: String,
    required: [true, 'O gênero é obrigatório'],
  },
  isbn: {
    type: String,
    required: [true, 'O ISBN é obrigatório'],
  },
  numeroCopias: {
    type: Number,
    required: [true, 'O número de cópias é obrigatório'],
  },
  capa: {
    type: String,
    required: [true, 'A URL da capa é obrigatória'],
  },
  comentarios: [{
    usuario: { type: String, required: true },
    texto: { type: String, required: true },
    avaliacao: { type: String, required: true },
  }]
});

// Criando o modelo
const Livro = mongoose.model('Livro', livroSchema);

module.exports = Livro;