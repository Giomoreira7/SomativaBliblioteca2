<template>
  <div class="app">
    <!-- Cabeçalho -->
    <header class="header">
      <div class="logo">
        <img src="../components/images/logo.png" alt="Logo da Biblioteca" />
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Início</router-link></li>
          <li><a href="/Menunicial">Menu Inicial</a></li>
        </ul>
      </nav>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Pesquise livros..." />
        <button @click="searchBooks">Buscar</button>
      </div>
    </header>

    <!-- Adicionar livro -->
    <div class="form-container">
      <h2>Adicionar Livros</h2>
      <input v-model="book.title" placeholder="Title" />
      <input v-model="book.author" placeholder="Author" />
      <input v-model="book.description" placeholder="Description" />
      <input type="file" @change="handleFileUpload" />
      <button @click="addBook">Adicionar</button>
    </div>

    <!-- Listar livros -->
    <div class="list-container">
      <h2>Lista de Livros Adicionados</h2>
      <ul>
        <li v-for="book in books" :key="book._id">
          <img v-if="book.image" :src="`http://localhost:5000${book.image}`" alt="Book Image" width="100" />
          <span>{{ book.title }} - {{ book.author }}</span>
          <button @click="editBook(book)">Editar</button>
          <button @click="removeBook(book._id)">Remover</button>
        </li>
      </ul>
    </div>

    <!-- Editar livro -->
    <div v-if="editingBook" class="form-container">
      <h2>Editar Livro</h2>
      <input v-model="editingBook.title" placeholder="Title" />
      <input v-model="editingBook.author" placeholder="Author" />
      <input v-model="editingBook.description" placeholder="Description" />
      <input type="file" @change="handleFileUpload" />
      <button @click="saveEdit">Salvar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
      book: {
        title: '',
        author: '',
        description: '',
        image: null,
      },
      editingBook: null,
      searchQuery: '',
    };
  },
  mounted() {
    this.listBooks();
  },
  methods: {
    async listBooks() {
      try {
        const response = await axios.get('http://localhost:5000/books');
        this.books = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    handleFileUpload(event) {
      if (this.editingBook) {
        this.editingBook.image = event.target.files[0];
      } else {
        this.book.image = event.target.files[0];
      }
    },

    async addBook() {
      const formData = new FormData();
      formData.append('title', this.book.title);
      formData.append('author', this.book.author);
      formData.append('description', this.book.description);
      if (this.book.image) formData.append('image', this.book.image);

      try {
        const response = await axios.post('http://localhost:5000/books', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.listBooks();
        this.book = { title: '', author: '', description: '', image: null };
      } catch (error) {
        console.error(error);
      }
    },

    editBook(book) {
      this.editingBook = { ...book };
    },

    async saveEdit() {
      const formData = new FormData();
      formData.append('title', this.editingBook.title);
      formData.append('author', this.editingBook.author);
      formData.append('description', this.editingBook.description);
      if (this.editingBook.image) formData.append('image', this.editingBook.image);

      try {
        await axios.put(`http://localhost:5000/books/${this.editingBook._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.listBooks();
        this.editingBook = null;
      } catch (error) {
        console.error(error);
      }
    },

    async removeBook(id) {
      try {
        await axios.delete(`http://localhost:5000/books/${id}`);
        this.listBooks();
      } catch (error) {
        console.error(error);
      }
    },

    async searchBooks() {
      try {
        const response = await axios.get(`http://localhost:5000/books/search?q=${this.searchQuery}`);
        this.books = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
/* Reset básico para garantir que o layout seja consistente */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
  line-height: 1.6;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Estilo para o cabeçalho */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: #045a5b;
  padding: 10px 20px;
}

.header .logo img {
  max-width: 150px;
}

.header nav ul {
  list-style: none;
  display: flex;
}

.header nav ul li {
  margin-right: 20px;
}

.header nav ul li:last-child {
  margin-right: 0;
}

.header nav ul li a {
  color:  #045a5b;
  text-decoration: none;
  font-weight: bold;
}

.header .search-bar {
  display: flex;
  align-items: center;
}

.header .search-bar input {
  padding: 5px;
  margin-right: 10px;
  font-size: 14px;
  width: 200px;
}

.header .search-bar button {
  padding: 5px 10px;
  background-color: #045a5b;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.header .search-bar button:hover {
  background-color: #13744b;
}

/* Estilo para o formulário de adicionar/editar livro */
.form-container {
  background-color: #fff;
  padding: 20px;
  margin: 20px 0;
  border-radius: 5px;
  box-shadow: 0 2px 5px #13744b
}

.form-container h2 {  
  margin-bottom: 20px;
}

.form-container input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #13744b;
  border-radius: 5px;
}

.form-container button {
  padding: 10px 20px;
  background-color: #045a5b;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  border-radius: 5px;
}

.form-container button:hover {
  background-color: #13744b;
}

/* Estilo para a lista de livros */
.list-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px#13744b;
}

.list-container h2 {
  margin-bottom: 20px;
}

.list-container ul {
  list-style: none;
}

.list-container ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.list-container ul li img {
  border-radius: 5px;
  margin-right: 15px;
}

.list-container ul li button {
  padding: 5px 10px;
  background-color: #d9534f;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
}

.list-container ul li button:hover {
  background-color: #c9302c;
}

/* Responsividade */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header .search-bar {
    margin-top: 10px;
    width: 100%;
  }

  .form-container input,
  .form-container button {
    width: 100%;
  }

  .list-container ul li {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
