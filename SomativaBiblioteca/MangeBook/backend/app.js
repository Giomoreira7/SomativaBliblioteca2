const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');  // Certifique-se de que o multer está sendo importado
const path = require('path');
const User = require('./models/User');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use (express.static(path.join(__dirname,'dist')))

app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname,'dist','index.html'));
});

// Configuração do multer para armazenar imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo único
  }
});

const upload = multer({ storage });

// Serve os arquivos da pasta 'uploads' para o frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Configuração do CORS para permitir apenas o frontend rodando na porta 8080
app.use(cors({
  origin: 'http://localhost:8080',  // Permitir apenas requisições de http://localhost:8080
}));

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://Giovanna:271004@library.hdzyr.mongodb.net/')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Middleware
app.use(express.json());

// Modelo de Usuário
app.post('/api/register', async (req, res) => {
  console.log('Dados recebidos no registro:', req.body);

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    // Verifique se o email já está registrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email já registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nome: name,
      email,
      senha: hashedPassword,
      tipo: role,
    });

    console.log('Usuário a ser salvo no banco:', user);

    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar o usuário', err);
    res.status(500).json({ error: 'Erro ao registrar o usuário' });
  }
});

// Rota para login de usuário
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email ou senha não fornecidos' });
  }

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(password, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: usuario._id, email: usuario.email }, process.env.JWT_SECRET || 'seuSegredoAqui', { expiresIn: '1h' });

    return res.json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error('Erro ao processar o login', err);
    return res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});

// Modelo de Livro
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String // Campo para armazenar o caminho da imagem
});

const Book = mongoose.model('Book', bookSchema);

// Rota para listar livros
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para adicionar livro com imagem
app.post('/books', upload.single('image'), async (req, res) => {
  const { title, author, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Caminho relativo da imagem

  const newBook = new Book({
    title,
    author,
    description,
    image: image  // A imagem é salva corretamente no banco com o caminho relativo
  });

  try {
    await newBook.save();
    res.status(201).send(newBook);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para editar livro
app.put('/books/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, author, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const book = await Book.findByIdAndUpdate(id, { title, author, description, image }, { new: true });
    res.json(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Rota para remover livro
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndDelete(id);
    res.status(200).send({ message: 'Livro removido com sucesso' });
  } catch (err) {
    res.status(500).send(err);
  }
});
// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
