<template>
  <div class="app">
    <!-- Cabeçalho -->
    <header class="header">
      <!-- Logo -->
      <div class="logo">
        <img src="../components/images/logo.png" alt="Logo da Biblioteca" />
      </div>

      <!-- Navegação -->
      <nav>
        <ul>
          <li><router-link to="/">Início</router-link></li>
          <li><a href="/Menunicial">Menu Inicial</a></li>
        </ul>
      </nav>

      <!-- Barra de Pesquisa -->
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Pesquise livros..." />
        <button @click="searchBooks">Buscar</button>
      </div>
    </header>

    <!-- Container dos Gráficos -->
    <div class="chart-container">
      <!-- Div para os gráficos -->
      <div class="charts-row">
        <!-- Gráfico de Pizza -->
        <div class="chart">
          <h2>Quantidade de Cadastro</h2>
          <PieChart :data="pieChartData" :options="chartOptions" />
        </div>
        <!-- Gráfico de Linha -->
        <div class="chart">
          <h2>Quantidade de Logins</h2>
          <LineChart :data="lineChartData" :options="lineChartOptions" />
        </div>
      </div>

      <!-- Gráfico de Colunas (Barra) abaixo do gráfico de Pizza -->
      <div class="bar-chart-container">
        <h2>Quantidade de Livros Cadastrados</h2>
        <BarChart :data="barChartData" :options="barChartOptions" />
      </div>
    </div>
  </div>
</template>


<script>
// Importando o necessário do vue-chartjs e Chart.js
import { defineComponent } from 'vue';
import { Pie, Line, Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Registrando os componentes necessários do Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, PointElement, CategoryScale, LinearScale, BarElement);

export default defineComponent({
  name: 'DashboardChart',
  components: {
    PieChart: Pie,
    LineChart: Line,
    BarChart: Bar, // Adicionando o gráfico de barras
  },
  data() {
    return {
      // Dados do gráfico de Pizza
      pieChartData: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [
          {
            label: 'Logins por Mês',
            data: [120, 150, 180, 220, 300],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },

      // Dados do gráfico de Linha
      lineChartData: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [
          {
            label: 'Logins por Mês',
            data: [120, 150, 180, 220, 300],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true, // Preencher a área abaixo da linha
            tension: 0.4, // Suavizar a linha
          },
        ],
      },

      // Dados do gráfico de Colunas (Barra)
      barChartData: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [
          {
            label: 'Livros Cadastrados',
            data: [40, 60, 80, 100, 120], // Quantidade de livros cadastrados
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },

      // Opções do gráfico de Pizza
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },

      // Opções específicas para o gráfico de Linha
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `Logins: ${tooltipItem.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50,
            },
          },
        },
      },

      // Opções do gráfico de Colunas (Barra)
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `Livros: ${tooltipItem.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20, // Ajuste do passo para o eixo Y
            },
          },
        },
      },

      // Modelo de busca de livros
      searchQuery: '',
    };
  },
  methods: {
    searchBooks() {
      if (this.searchQuery) {
        // Lógica de busca, por exemplo, redirecionando para a página de resultados
        console.log(`Buscando livros por: ${this.searchQuery}`);
      } else {
        alert('Por favor, insira um termo de pesquisa.');
      }
    },
  },
});
</script>

<style scoped>
/* Estilos do cabeçalho */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  color: white;
}

.logo img {
  max-height: 50px;
}

nav ul {
  display: flex;
  gap: 20px;
  list-style-type: none;
}

nav ul li {
  font-size: 16px;
}

nav ul li a {
  text-decoration: none;
  color:  #045a5b;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #045a5b;
}

.search-bar {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-bar input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 200px;
}

.search-bar button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #045a5b;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #13744b;
}

/* Estilos dos Gráficos */
.chart-container {
  margin: 20px auto;
  padding: 20px;
}

.charts-row {
  display: flex;
  justify-content: space-between;
  gap: 200px; /* Espaçamento entre os gráficos */
  margin: 100px;
}

.chart {
  width: 48%; /* Cada gráfico ocupa 48% do espaço disponível */
  height: 400px; /* Definindo uma altura fixa para os gráficos */
}

.bar-chart-container {
  margin-top: 20px; /* Garantir um espaçamento entre o gráfico de barras e o título */
  width: 100%;
  height: 400px;
}

canvas {
  width: 100%;
  height: 100%;
}

/* Responsividade */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .logo img {
    max-height: 40px;
  }

  nav ul {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  .search-bar input {
    width: 150px;
  }

  .search-bar button {
    padding: 8px;
    font-size: 14px;
  }
}
</style>
