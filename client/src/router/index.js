import { createRouter, createWebHistory } from 'vue-router';
import { computed, watch } from '@vue/runtime-core';

import store from '../store';

import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Logout from '../views/Logout.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const authToken = computed(() => store.getters.getAuthToken);
const isLoggedInStore = computed(() => store.getters.isLoggedIn);
const checkUser = () => store.dispatch('checkUser');

const loggedInRedirectDashboard = (to, from) => {
  if (isLoggedInStore.value) return '/dashboard';
};

const isLoggedIn = (to, from) => {
  // if the user is logged in forward
  // if (isLoggedInStore.value) return to.path;
  // if (authToken.value) {
  //   checkUser();
  //   watch(isLoggedInStore.value, () => {
  //     return isLoggedInStore.value ? to.path : false;
  //   });
  // }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: isLoggedIn,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: isLoggedIn,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
