import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import VideoPage from '../views/VideoPage.vue'
import Collection from "../views/Collection.vue"

import { firebase } from '@firebase/app'
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'FlashChat',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/VideoPage',
    name: 'VideoPage',
    component: VideoPage
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/collection',
    name: "Collection",
    component: Collection,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router
