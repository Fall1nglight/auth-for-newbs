import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import Logout from '../views/Logout.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

import guards from './before-enter-guards';
import storeFns from './store-functions';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // ? rate limiter error
    beforeEnter: [storeFns.checkUser, storeFns.fetchPublicNotes],
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: [guards.hasAuthToken],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: [guards.hasAuthToken],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: [guards.checkLogin, storeFns.fetchNotes],
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashbiard',
    component: AdminDashboard,
    beforeEnter: [
      guards.checkLogin,
      storeFns.fetchAllUsers,
      storeFns.fetchStatistics,
    ],
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: guards.hasAuthTokenLogout,
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
