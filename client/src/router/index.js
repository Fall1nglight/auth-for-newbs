import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Logout from '../views/Logout.vue';
import NotFoundPage from '../views/NotFoundPage.vue';

const loggedInRedirectDashboard = (to, from, next) => {
  if (localStorage.token) {
    // ! validate the token

    next('/dashboard');
  } else {
    next();
  }
};

const isLoggedIn = (to, from, next) => {
  // ! validate the token

  if (!localStorage.token) return next('/login');
  next();
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
