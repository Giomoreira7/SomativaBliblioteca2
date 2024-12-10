<template>
  <div class="fundo">
    <div class="register-container">
      <div class="register-header">
        <h1>Registrar</h1>
      </div>

      <form @submit.prevent="submitRegister">
        <input 
          type="text" 
          v-model="name" 
          placeholder="Nome" 
          required 
        />
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
        <select v-model="role" required>
          <option value="Aluno">Aluno</option>
          <option value="Funcionario">Funcionário</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'Aluno'
    };
  },
  methods: {
    submitRegister() {
      const registerData = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role
      };

      axios.post('http://localhost:5000/api/register', registerData)
        .then(response => {
          console.log('Usuário registrado:', response);
          this.$router.push('/Login'); // Redireciona para a página de login
        })
        .catch(error => {
          console.error('Erro ao registrar:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Estilos do seu formulário e página */
.fundo {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../components/images/FundoLogin.png') no-repeat center center fixed;
  background-size: cover;
}

.register-container {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}

button {
  padding: 12px;
  background-color: #045a5b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover {
  background-color: rgba(21, 180, 150, 0.9);
}
</style>
