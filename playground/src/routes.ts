import Index from './pages/index.vue';
import About from './pages/about.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: Index, 
  },
  {
    path: '/about',
    component: About, 
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
