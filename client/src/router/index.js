import { createRouter, createWebHistory } from 'vue-router';
import { computed } from '@vue/runtime-core';

import store from '../store';

import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import Logout from '../views/Logout.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const authToken = computed(() => store.getters['auth/authToken']);
const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);
const checkUser = () => store.dispatch('auth/checkUser');
const fetchNotes = () => store.dispatch('notes/fetchNotes');
const fetchPublicNotes = () => store.dispatch('public/fetchNotes');
const fetchAllUsers = () => store.dispatch('admin/fetchAllUsers');
const fetchStatistics = () => {
  store.dispatch('statistics/fetchNumberOfNotes');
  store.dispatch('statistics/fetchEditedNotes');
  store.dispatch('statistics/fetchMarkedDoneNotes');
};

// todo | make little middlewares from these functions
const isLoggedInRedirectDashboard = async (to, from, next) => {
  if (!authToken.value) return next({ path: '/login' });

  // user has token, need to validate it
  await checkUser();

  //if the token was valid forward to /dashboard else to /login
  return isLoggedIn.value ? next() : next({ path: '/login' });
};

const checkAdmin = (to, from, next) =>
  isAdmin.value ? next() : next({ path: '/dashboard' });

const hasAuthToken = (to, from, next) =>
  authToken.value ? next({ path: '/dashboard' }) : next();

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: [fetchPublicNotes],
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: hasAuthToken,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: hasAuthToken,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: [isLoggedInRedirectDashboard, fetchNotes],
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashbiard',
    component: AdminDashboard,
    beforeEnter: [
      isLoggedInRedirectDashboard,
      checkAdmin,
      fetchAllUsers,
      fetchStatistics,
    ],
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: (to, from, next) => {
      if (authToken.value) return next();
    },
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
