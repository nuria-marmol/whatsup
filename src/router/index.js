import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from "@/views/LoginView";
import SignupView from "@/views/SignupView";
import HomeView from "@/views/HomeView";
import SearchView from "@/views/SearchView";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registro',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
