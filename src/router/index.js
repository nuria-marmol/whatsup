import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from "@/views/LoginView";
import SignupView from "@/views/SignupView";

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
