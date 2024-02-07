import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized, type RouteLocationNormalizedLoaded } from 'vue-router'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import UsersView from '@/views/Dashboard/Sections/Users/UsersView.vue'
import LoginView from '@/views/Login/LoginView.vue'
import BlogView from '@/views/BlogView.vue'
import PostView from '@/views/PostView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProductsView from '@/views/Dashboard/Sections/Products/ProductsView.vue'

const isAuthenticated = () => {
  return localStorage.getItem('tokenAuth') !== null;
};

const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next:NavigationGuardNext): void => {
  if (isAuthenticated()) {
    next();
  } else {
    next('/login');
  }
};

const requireGuest = (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext):void => {
  if (!isAuthenticated()) {
    next();
  } else {
    next('/dashboard');
  }
};

const routes = [
  { path: '/', redirect: isAuthenticated() ? '/dashboard' : '/login' },
  { path: '/login', name: 'login', component: LoginView, beforeEnter: requireGuest },
  { path: '/register', name: 'register', component: RegisterView, beforeEnter: requireGuest },
  { 
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    beforeEnter: requireAuth,
    children: [
      { path: '', redirect: 'users', name: 'users'}, // Ruta hija predeterminada, redirige a 'users'
      { path: 'users', name: 'users', component: UsersView }, // Ruta hija 'users'
      { path: 'products', name: 'products', component: ProductsView }, // Ruta hija 'products'
    ], 
  },
  { path: '/blog', name: 'blog', component: BlogView, beforeEnter: requireAuth },
  { path: '/blog/:id', name: 'post', component: PostView, beforeEnter: requireAuth },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router

