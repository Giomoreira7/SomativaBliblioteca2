<template>
  <div class="fundo">
    <div class="login-container">
      <div class="login-header">
        <h1>Login</h1>
      </div>
      
      <form @submit.prevent="submitLogin">
        <input 
          type="email" 
          v-model="email" 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          v-model="password" 
          placeholder="Senha" 
          required 
        />
        <button type="submit">Entrar</button>
      </form>

      <div class="cadastrar-container">
        <p class="recuperar-senha">Esqueci minha senha</p>
        <p class="link-cadastrar">
          Não tem uma conta? 
          <router-link to="/register">Registre-se aqui</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    submitLogin() {
      const loginData = {
        email: this.email,
        password: this.password
      };

      axios.post('http://localhost:5000/api/login', loginData)
        .then(response => {
          // Armazenar o token JWT no localStorage
          localStorage.setItem('token', response.data.token);
          this.$router.push('/Menunicial'); // Redireciona para a página Menu
        })
        .catch(error => {
          console.error('Erro no login:', error);
        });
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.fundo {
  height: 100vh;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./images/FundoLogin.png') no-repeat center center fixed;
  background-size: cover;
}

html, body {
  height: 100%;
  padding: 0;
  font-size: 14px;
}

body {
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-header h1 {
  font-family: sans-serif;
  margin: 0 0 20px;
  color: #045A5B;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  background-color: rgb(4, 90, 91);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: rgba(21, 180, 150, 0.8);
}

.recuperar-senha, .link-cadastrar {
  color: rgba(21, 180, 150, 1);
  cursor: pointer;
  text-decoration: underline;
}

.cadastrar-container {
  margin-top: 20px;
}
</style>

