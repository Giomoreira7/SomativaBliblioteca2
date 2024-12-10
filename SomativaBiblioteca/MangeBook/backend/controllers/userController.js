const User = require('../models/User');

// Função para criar um novo usuário
const createUser = async (req, res) => {
  try {
    const { nome, email, senha, cpf, tipo, identificacao } = req.body;

    // Verificando se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe!' });
    }

    // Criando o novo usuário
    const user = new User({ nome, email, senha, cpf, tipo, identificacao });

    // Salvando o usuário no banco de dados
    await user.save();

    // Retornando a resposta com o usuário criado
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err });
  }
};

// Função para login de usuário
const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificando se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos' });
    }

    // Verificando se a senha fornecida é válida
    if (user.senha !== senha) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos' });
    }

    // Se a senha for correta, podemos enviar uma resposta de sucesso
    res.status(200).json({ message: 'Login realizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer login', error: err });
  }
};

// Função para listar todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
};
