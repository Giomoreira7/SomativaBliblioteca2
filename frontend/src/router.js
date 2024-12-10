import { createRouter, createWebHistory } from 'vue-router';
import Login from '../src/components/Login.vue';
import Register from '../src/components/Register.vue';
import Home from '../src/views/Home.vue';
import MenuInicial from '../src/views/MenuIncial.vue';
import RegistarLivro from '../src/components/RegistrarLivro.vue';
import catalago from '../src/components/catalago.vue';
import Dashboard from '../src/views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../src/views/Home.vue'), // Pode ser qualquer componente de página inicial
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/Menunicial',
    name: 'Menunicial',
    component: MenuInicial,
  },
  {
      path: '/RegistarLivro',
      name: 'RegistarLivro',
      component: RegistarLivro
    },
     {
      path: '/catalago',
      name: 'catalago',
      component: catalago
    },
     {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });
  
  export default router;