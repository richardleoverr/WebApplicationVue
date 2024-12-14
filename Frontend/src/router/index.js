import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddPost from '@/views/AddPost.vue'
import PostView from '@/views/PostView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/addpost',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/post/:id',
    name: 'PostView',
    component: PostView
  }
  
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
