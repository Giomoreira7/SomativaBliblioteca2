
<template>
    <div>
      <!-- Cabeçalho -->
      <header>
        <div class="logo">
          <img src="../components/images/logo.png" alt="Logo da Biblioteca" />
        </div>
        <nav>
          <ul>
            <li><a href="/">Pagina Inicial</a></li>
          </ul>
        </nav>
      </header>
  
      <!-- Corpo do menu inicial -->
      <section>
        <img src="../components/images/FundoAdm.png" alt="fundo adm" />
        <button @click="goToDashboard">Dashboard</button>
        <button @click="goToRegistrarLivro">Registrar Livro</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToDashboard() {
        this.$router.push({ name: 'Dashboard' }); // Redireciona para a página Dashboard
      },
      goToRegistrarLivro() {
        this.$router.push('/RegistarLivro'); // Redireciona para a página Registrar Livro
      },
      goToBookList(){
        this.$router.push({ name: 'BookList' });
      }

    }
  };
  </script>
  
  <style scoped>
  /* Estilos para o cabeçalho */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #ffffff;
    color:  #045A5B;
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
  
  /* Estilos para o corpo do Menu Inicial */
  section {
    text-align: center;
    margin-top: 40px;
    color:  #045A5B;
    font-size: 50px;
    padding-top: 20px; 
  }
  
button {
  padding: 25px 650px;
  margin: 50px;
  margin-top: 50px; /* Ajuste o valor conforme necessário */
  background-color: #045A5B;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: block; /* Garante que o botão ocupe toda a largura disponível */
  margin-left: auto; /* Centraliza horizontalmente */
  margin-right: auto; /* Centraliza horizontalmente */
}

  
  button:hover {
    background-color: #1a9496; /* Cor de fundo ao passar o mouse */
  }
  </style>
  