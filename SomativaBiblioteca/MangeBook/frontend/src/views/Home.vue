<template>
  <div class="app">
    <!-- Cabeçalho -->
    <header>
      <div class="logo">
        <img src="../components/images/logo.png" alt="Logo da Biblioteca" />
      </div>
      <nav>
        <ul>
          <li><a href="/Login">Login</a></li>
          <li><a href="#sobre">Sobre</a></li>
          <li><a href="/Login">Administrador</a></li>
        </ul>
      </nav>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Pesquise livros..." />
        <button @click="searchBooks">Buscar</button>
      </div>
    </header>

    <!-- Seção "Sobre" -->
    <section id="sobre">
      <!-- Conteúdo sobre, se necessário -->
    </section>

    <!-- Indicação do Mês com 5 Imagens -->
    <section id="indicacao-do-mes">
      <div class="indicacao-titulo">
        <h2>Indicação do Mês</h2>
      </div>
      <div class="indicacao-imagens">
        <img src="../components/images/Imagem1.jpg" alt="Imagem 1" />
        <img src="../components/images/Imagem2.jpg" alt="Imagem 2" />
        <img src="../components/images/Imagem3.jpg" alt="Imagem 3" />
        <img src="../components/images/Imagem4.jpg" alt="Imagem 4" />
        <img src="../components/images/Imagem5.jpg" alt="Imagem 5" />
        <img src="../components/images/Imagem6.jpg" alt="Imagem 6" />
        <img src="../components/images/Imagem7.jpg" alt="Imagem 7" />
        <img src="../components/images/Imagem8.jpg" alt="Imagem 8" />
      </div>
    </section>

    <!-- Categorias -->
    <section class="categorias">
      <h2 class="categorias-titulo">Categorias</h2>
      <div class="categorias-botoes">
        <!-- Botões para todas as categorias, agora redirecionando para a página Catalogo -->
        <router-link to="/catalago" class="categoria">Ficção</router-link>
        <router-link to="/catalago" class="categoria">Mistério</router-link>
        <router-link to="/catalago" class="categoria">Romance</router-link>
        <router-link to="/catalago" class="categoria">Ciência</router-link>
        <router-link to="/catalago" class="categoria">História</router-link>
      </div>
    </section>

    <!-- Clube da Leitura -->
    <section class="clube-leitura">
      <h2 class="clube-titulo">Clube da Leitura</h2>
      <div class="clube-imagens">
        <img src="../components/images/Book1.png" alt="Livro 1" />
      </div>
      <p class="clube-texto">Invenção de Orfeu, Jorge de Lima. Uma epopeia moderna que dialoga com os maiores poetas da humanidade!</p>
    </section>

    <!-- Rodapé -->
    <footer class="footer">
      <p>A Biblioteca da Escola e Faculdade de Tecnologia SENAI "Roberto Mange" tem por finalidade organizar e disseminar informações, oferecendo subsídios às atividades de ensino e pesquisa de toda comunidade escolar.</p>
      <p><strong>Horário de atendimento:</strong><br> Segunda a sexta: das 08h às 17h e das 18h às 20h<br> Sábados: das 08h às 13h15</p>
      <div class="footer-logo">
        <img src="../components/images/senai-logo.png" alt="Logo do SENAI" />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    searchBooks() {
      // Lógica de pesquisa de livros
      console.log("Buscando por:", this.searchQuery);
    },
    goToCatalogo() {
      // Navega para a página do Catálogo
      this.$router.push({ name: 'Catalogo' });
    }
  }
};
</script>

<style scoped>
/* Estilo do Cabeçalho */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}

header .logo img {
  height: 70px;
}

header nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

header nav ul li {
  margin-left: 20px; /* Espaço entre os itens */
}

header nav ul li a {
  color: #045A5B;
  text-decoration: none;
  font-size: 22px;
  padding: 10px;
  transition: color 0.3s;
}

header nav ul li a:hover {
  color: #27ae60; /* Cor de hover para o link */
}

header .search-bar {
  display: flex;
  align-items: center; /* Alinha o campo de pesquisa verticalmente ao centro */
}

header .search-bar input {
  padding: 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  width: 400px; /* Largura do campo de pesquisa */
  font-size: 16px; /* Tamanho da fonte do campo de pesquisa */
}

header .search-bar button {
  padding: 15px 40px; /* Tamanho do botão */
  background-color: #045A5B;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

header .search-bar button:hover {
  background-color: #1a9496; /* Cor de fundo do botão ao passar o mouse */
}

/* Seções */
section {
  padding: 40px; /* Padding para as seções */
  text-align: left;
}

#sobre {
  background-image: url('../components/images/FundoTela01.png'); /* Caminho da sua imagem */
  background-size: cover;  /* Faz a imagem cobrir toda a seção */
  background-position: center center; /* Centraliza a imagem */
  background-attachment: fixed; /* Faz a imagem de fundo se mover com o conteúdo ao rolar */
  padding: 40px;
  color: white; /* Cor do texto para contraste com o fundo */
  text-align: center;
  height: 70vh;
}

#indicacao-do-mes {
  text-align: center;
  padding: 40px 0;
  background-color: #045A5B; /* Cor de fundo para a seção */
}

.indicacao-titulo h2 {
  font-size: 40px;
  color: #ffffff;
  margin-bottom: 20px;
  text-align: center; 
  margin-left: 20px;
  margin-top: 5px;
}

.indicacao-imagens {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espaçamento entre as imagens */
}

.indicacao-imagens img {
  width: 150px;
  height: auto;
  border-radius: 10px; /* Bordas arredondadas para as imagens */
  transition: transform 0.3s; /* Adiciona transição suave */
}

.indicacao-imagens img:hover {
  transform: scale(1.1); /* Aumenta a imagem em 10% ao passar o mouse */
}

.categorias {
  margin-top: 40px;
  text-align: center;
}

.categorias-titulo {
  font-size: 45px;
  color: #045A5B;
  margin-bottom: 100px;
  text-align: center; 
  margin-top: 10px;
}

.categorias-botoes {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.categoria {
  background-color: #045A5B; /* Cor verde */
  color: white;
  border: none;
  padding: 70px 200px;
  border-radius: 25px; /* Botões arredondados */
  font-size: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.categoria:hover {
  background-color: #45a0a1; /* Cor de hover mais clara */
}

.clube-leitura {
  text-align: center;
   padding: 40px 0; 
   background-color: #f5f5f5; 
  } 
  .clube-titulo { 
    font-size: 40px; 
    color: #045A5B;
     margin-bottom: 20px; 
     text-align: center; 
    } 
    .clube-imagens { 
      display: flex; 
      justify-content: center;
       gap: 20px; 
       /* Espaçamento entre as imagens */
       } 
       .clube-imagens img {
         width: 600px; /* Ajuste o tamanho conforme necessário */ 
         height: auto; 
         border-radius: 10px; /* Bordas arredondadas para as imagens */ 
         transition: transform 0.3s; /* Adiciona transição suave */ }
          .clube-imagens img:hover { 
            transform: scale(1.1); /* Aumenta a imagem em 10% ao passar o mouse */ } 
            .clube-texto { 
              font-size: 20px; 
              color: #045A5B; 
              margin-top: 10px; 
              text-align: center;
            }
.footer {
   padding: 20px; 
   background-color: #045A5B; 
   color: white; 
   text-align: center; 
   position: relative; 
   bottom: 0; 
   width: 100%;
    }
     .footer p { 
      margin: 10px 0; 
      font-size: 25px;
      margin-left: 15px;
      text-align: left;
      } 
      .footer-logo { 
        margin-top: -150px; 
        margin-left: 950px;
        } 
        .footer-logo img {
           width: 250px; 
           /* Ajuste a largura conforme necessário */ 
           height: auto; }
</style>
