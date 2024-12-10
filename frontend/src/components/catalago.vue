<template>
  <div class="app">
    <!-- Cabeçalho -->
    <header>
      <div class="logo">
        <img src="../components/images/logo.png" alt="Logo da Biblioteca" />
      </div>
      <nav>
        <ul>
          <li><a href="/">Página Inicial</a></li>
        </ul>
      </nav>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Pesquise livros..." />
        <button @click="searchBooks">Buscar</button>
      </div>
    </header>

    <!-- Livros por Categorias -->
    <section class="livros">
      <div class="categoria" v-for="(categoria, index) in categoriasLivros" :key="index">
        <h2>{{ categoria.nome }}</h2>
        <div class="livros-grid">
          <!-- Exibe os livros filtrados ou todos os livros -->
          <div v-for="(livro, index) in filteredLivros.length ? filteredLivros : categoria.livros" :key="index" class="livro">
            <img :src="livro.imagem" :alt="livro.titulo" />
            <div class="descricao">
              <div class="avaliacao">{{ livro.avaliacao }}</div>
              <div class="titulo">{{ livro.titulo }}</div>
              <div class="autor">Autor: {{ livro.autor }}</div>
              <div class="disponibilidade">Disponível: {{ livro.disponibilidade }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção de Livros Recentemente Adicionados -->
      <div class="categoria" v-if="recentBooks.length">
        <h2>Livros Recentemente Adicionados</h2>
        <div class="livros-grid">
          <div v-for="(livro, index) in recentBooks" :key="index" class="livro">
            <img :src="livro.imagem" :alt="livro.titulo" />
            <div class="descricao">
              <div class="avaliacao">{{ livro.avaliacao }}</div>
              <div class="titulo">{{ livro.titulo }}</div>
              <div class="autor">Autor: {{ livro.autor }}</div>
              <div class="disponibilidade">Disponível: {{ livro.disponibilidade }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Botão para adicionar novo livro -->
    <div class="container-cadastre">
      <router-link to="/RegistarLivro" class="btn-cadastre-mais">Adicionar Novo Livro</router-link>
    </div>

    <!-- Rodapé -->
    <footer>
      <div class="footer-esquerda">
        <p>Português (Brasil)</p>
      </div>
      <div class="footer-centro">
        <p>© 2024 Todos os direitos reservados, Mange Library ®</p>
      </div>
      <div class="footer-direita">
      </div>
    </footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      searchQuery: '',
      livros: [
        { imagem: require('../components/images/Livro11.jpg'), avaliacao: "★★★★☆", titulo: "Em rota de colisão", autor: "Bal Khabra", categoria: "Romance", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro6.jpg'), avaliacao: "★★★★★", titulo: "O túmulo veloz", autor: "Robert Galbraith", categoria: "Mistério", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro28.jpg'), avaliacao: "★★★★★", titulo: "Oito Assassinatos Perfeitos", autor: " Peter Swanson ", categoria: "Mistério", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro7.jpg'), avaliacao: "★★★★★", titulo: "Depois daquela noite", autor: "Karin Slaughter", categoria: "Mistério", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro8.jpg'), avaliacao: "★★★★★", titulo: "A sociedade oculta de Londres", autor: "Sarah Penner", categoria: "Mistério", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro9.jpg'), avaliacao: "★★★★★", titulo: "O crime do bom nazista", autor: "Samir Machado de Machado", categoria: "Mistério", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro10.jpg'), avaliacao: "★★★★★", titulo: "O preço da vitória", autor: "Harlan Coben", categoria: "Mistério", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro39.jpg'), avaliacao: "★★★★★", titulo: "A mulher na janela", autor: " A. J. Finn", categoria: "Mistério", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro40.jpg'), avaliacao: "★★★★★", titulo: "Uma mulher no escuro", autor: " Raphael Montes ", categoria: "Mistério", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro41.jpg'), avaliacao: "★★★★★", titulo: "Battle Royale", autor: " Koushun Takami ", categoria: "Mistério", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro42.jpg'), avaliacao: "★★★★★", titulo: "A contadora", autor: " Freida McFadden", categoria: "Mistério", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro16.jpg'), avaliacao: "★★★★☆", titulo: "Outlive: A arte e a ciência de viver mais e melhor", autor: "Peter Attia", categoria: "Ciência", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro1.jpg'), avaliacao: "★★★★★", titulo: "O Hobbit + pôster", autor: "J.R.R. Tolkien", categoria: "Ficção", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro2.jpg'), avaliacao: "★★★★★", titulo: "Tudo é rio", autor: "Carla Madeira", categoria: "Ficção", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro21.jpg'), avaliacao: "★★★★☆", titulo: "1499: O Brasil antes de Cabral", autor: "Reinaldo José Lopes", categoria: "História", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro17.jpg'), avaliacao: "★★★★☆", titulo: "Apaixone-se pelo problema, não pela solução", autor: "Uri Levine", categoria: "Ciência", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro18.jpg'), avaliacao: "★★★★☆", titulo: "Uma breve história do tempo", autor: "Stephen Hawking", categoria: "Ciência", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro29.jpg'), avaliacao: "★★★★☆", titulo: "Detetives da aviação", autor: "Christine Negroni", categoria: "Ciência", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro19.jpg'), avaliacao: "★★★★★", titulo: "Darwin sem frescura", autor: "Reinaldo José Lopes", categoria: "Ciência", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro12.jpg'), avaliacao: "★★☆☆☆", titulo: "O morro dos ventos uivantes", autor: "Emily Brontë", categoria: "Romance", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro20.jpg'), avaliacao: "★★★★☆", titulo: "Os mistérios do Universo", autor: "Will Gater", categoria: "Ciência", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro43.jpg'), avaliacao: "★★★★☆", titulo: "Uma breve história do tempo", autor: " Stephen Hawking", categoria: "Ciência", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro44.jpg'), avaliacao: "★★★★☆", titulo: "Pálido ponto azul", autor: "Carl Sagan", categoria: "Ciência", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro45.jpg'), avaliacao: "★★★★☆", titulo: "Doppelgänger", autor: " Naomi Klein", categoria: "Ciência", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro46.jpg'), avaliacao: "★★★★☆", titulo: "O oráculo da noite", autor: "Sidarta Ribeiro", categoria: "Ciência", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro13.jpg'), avaliacao: "★★★★☆", titulo: "É Assim que Acaba", autor: "Colleen Hoover", categoria: "Romance", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro14.jpg'), avaliacao: "★★★★☆", titulo: "Vergonha", autor: "Brittainy Cherry", categoria: "Romance", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro15.jpg'), avaliacao: "★★★★☆", titulo: "Imperfeitos", autor: "Christina Lauren", categoria: "Romance", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro22.jpg'), avaliacao: "★★★★☆", titulo: "Sobreviventes e guerreiras: Uma breve história da mulher no Brasil de 1500 a 2000", autor: "Mary del Priore", categoria: "História", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro3.jpg'), avaliacao: "★★★★☆", titulo: "A empregada", autor: "Freida McFadden", categoria: "Ficção", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro27.jpg'), avaliacao: "★★★★☆", titulo: "A metamorfose: DIE VERWANDLUNG", autor: " Franz Kafka", categoria: "Ficção", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro26.jpg'), avaliacao: "★★★★☆", titulo: "Vidas secas", autor: "Graciliano Ramos", categoria: "Ficção", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro4.jpg'), avaliacao: "★★★★★", titulo: "A Biblioteca da Meia-Noite", autor: "Matt Haig", categoria: "Ficção", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro35.jpg'), avaliacao: "★★★★★", titulo: "5 Lições de Storytelling", autor: " James McSill", categoria: "Ficção", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro36.jpg'), avaliacao: "★★★★★", titulo: "Fogo & Sangue ", autor: " George R. R. Martin ", categoria: "Ficção", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro37.jpg'), avaliacao: "★★★★★", titulo: "Eu, Robô ", autor: " Isaac Asimov ", categoria: "Ficção", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro38.jpg'), avaliacao: "★★★★★", titulo: "Contos de fadas dos irmãos Grimm", autor: " Irmãos Grimm", categoria: "Ficção", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro23.jpg'), avaliacao: "★★★★★", titulo: "O perigo de uma história única", autor: "Chimamanda Ngozi Adichie", categoria: "História", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro24.jpg'), avaliacao: "★★★★★", titulo: "O queijo e os vermes", autor: "Carlo Ginzburg", categoria: "História", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro25.jpg'), avaliacao: "★★★★★", titulo: "Israel x Palestina: 100 Anos de Guerra", autor: "James L. Gelvin", categoria: "História", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro30.jpg'), avaliacao: "★★★★★", titulo: "Como a loucura mudou a História", autor: "Christopher Ferguson", categoria: "História", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro47.jpg'), avaliacao: "★★★★★", titulo: "Segunda Guerra História Ilustrada em 300 Fotos", autor: " Cláudio Blanc ", categoria: "História", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro48.jpg'), avaliacao: "★★★★★", titulo: "Assassinos da Lua das Flores: Petróleo, morte e a origem do FBI ", autor: " David Grann ", categoria: "História", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro49.jpg'), avaliacao: "★★★★★", titulo: "O despertar de tudo: Uma nova história da humanidade", autor: " David Graeber", categoria: "História", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro50.jpg'), avaliacao: "★★★★★", titulo: "Pré-história", autor: " Chris Gosden ", categoria: "História", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro5.jpg'), avaliacao: "★★★★☆", titulo: "Era uma vez um coração partido", autor: "Stephanie Garber", categoria: "Romance", disponibilidade: "Não" },
        { imagem: require('../components/images/Livro31.jpg'), avaliacao: "★★★★☆", titulo: "Mil batidas do coração", autor: "Kiera Cass", categoria: "Romance", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro32.jpg'), avaliacao: "★★★★☆", titulo: "É assim que começa", autor: " Colleen Hoover", categoria: "Romance", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro33.jpg'), avaliacao: "★★★★☆", titulo: "Eu e Esse meu Coração", autor: " C. C. Hunter", categoria: "Romance", disponibilidade: "Sim" },
        { imagem: require('../components/images/Livro34.jpg'), avaliacao: "★★★★☆", titulo: "Era uma vez um coração partido", autor: "Erin Doom ", categoria: "Romance", disponibilidade: "Não" }
      ],
      filteredLivros: [], // Livros filtrados com base na pesquisa
      recentBooks: [] // Livros recentemente adicionados
    };
  },
  computed: {
    categoriasLivros() {
      const categories = ['Ficção', 'Romance', 'Mistério', 'Ciência', 'História'];
      return categories.map(categoria => ({
        nome: categoria,
        livros: this.livros.filter(livro => livro.categoria === categoria),
      }));
    }
  },
  methods: {
    searchBooks() {
      if (this.searchQuery) {
        this.filteredLivros = this.livros.filter(livro =>
          livro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          livro.autor.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredLivros = [];
      }
    },
    addBook(newBook) {
      // Adiciona o livro na lista principal
      this.livros.push(newBook);
      // Adiciona o livro à lista de livros recentes
      this.recentBooks.push(newBook);
      // Limita o número de livros recentemente adicionados a, por exemplo, 5
      if (this.recentBooks.length > 5) {
        this.recentBooks.shift(); // Remove o livro mais antigo
      }
    }
  },
  watch: {
    searchQuery(newQuery) {
      this.searchBooks();
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}

/* Cabeçalho */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  color: #fff;
  padding: 10px 20px;
}

header .logo img {
  width: 250px;
}

header nav ul {
  list-style: none;
  display: flex;
}

header nav ul li {
  margin-right: 20px;
}

header nav ul li a {
  text-decoration: none;
  color: #045A5B;
  font-weight: bold;
  margin-left: 100px;
}

header .search-bar {
  display: flex;
}

header .search-bar input {
  padding: 5px;
  font-size: 16px;
  margin-right: 10px;
}

header .search-bar button {
  padding: 6px 12px;
  background-color: #045A5B;
  border: none;
  color: white;
  cursor: pointer;
}

/* Seção de Livros */
.livros {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.livros .categoria h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.livros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center; /* Isso vai centralizar os itens dentro da grid */
  max-width: 1200px; /* Define uma largura máxima para a grid */
  margin: 0 auto; /* Centraliza a grid dentro do container */
}

.livro {
  background-color: #fff;
  padding: 1px;
  border-radius: 5px;
  border: 1px solid #ddd;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.livro:hover {
  transform: scale(1.05);
}

.livro img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;
}

.livro:hover img {
  transform: scale(1.1);
}

.livro .descricao {
  margin-top: 10px;
}

.livro .avaliacao {
  font-size: 14px;
  color: #045A5B;
}

.livro .titulo {
  font-size: 18px;
  font-weight: bold;
}

.livro .autor {
  font-size: 14px;
  color: #777;
}

.livro .disponibilidade {
  font-size: 14px;
  color: green;
}

/* Botão de cadastro */
.container-cadastre {
  text-align: center;
  margin: 20px 0;
}

.btn-cadastre-mais {
  background-color: #045A5B;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
}

footer {
  display: flex;
  justify-content: space-between;
  background-color: #045A5B;
  color: white;
  padding: 10px 20px;
}

footer .footer-esquerda, footer .footer-centro, footer .footer-direita {
  flex: 1;
}

footer .footer-direita a {
  text-decoration: none;
  color: white;
}

footer .footer-centro p {
  text-align: center;
}
</style>
