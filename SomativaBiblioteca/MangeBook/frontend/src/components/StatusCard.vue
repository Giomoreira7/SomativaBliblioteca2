<template>
  <div class="chart-container">
    <h2>Quantidade de Logins</h2>
    <canvas ref="loginCanvas"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js';

export default {
  name: 'LoginChart',
  data() {
    return {
      loginData: [120, 150, 180, 220, 300],
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
    };
  },
  mounted() {
    this.renderLoginChart();
  },
  methods: {
    renderLoginChart() {
      new Chart(this.$refs.loginCanvas, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Logins por Mês',
            data: this.loginData,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  max-width: 800px;
  margin: 0 auto 40px auto;
}

canvas {
  max-width: 100%;
  height: 300px;
}
</style>
