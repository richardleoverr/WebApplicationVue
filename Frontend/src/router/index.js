import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddPost from '@/views/AddPost.vue'
import PostView from '@/views/PostView.vue';
import LoginView from '@/views/LoginView.vue';
import ContactUsView from '@/views/ContactUsView.vue';
import auth from "../auth";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      console.log(authResult)
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
  }
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
    }
  },
  {
    path: '/post/:id',
    name: 'PostView',
    component: PostView,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
    }
  },
  {
    path: '/c',
    component: ContactUsView, 
  },
  
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
