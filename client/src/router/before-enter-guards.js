import { computed } from 'vue';

import store from '../store';
import storeFns from './store-functions';

import { Types } from '../store/types';
import { auth } from '../store/types/namespaces';

const authToken = computed(
  () => store.getters[`${auth}${Types.getters.GET_AUTHTOKEN}`]
);

const isLoggedIn = computed(
  () => store.getters[`${auth}${Types.getters.IS_LOGGED_IN}`]
);

const isAdmin = computed(
  () => store.getters[`${auth}${Types.getters.IS_ADMIN}`]
);

const checkLogin = async (to, from, next) => {
  if (!authToken.value) return next({ path: '/login' });

  // user has token, need to validate it
  await storeFns.checkUser();

  //if the token was valid forward to /dashboard else to /login
  return isLoggedIn.value ? next() : next({ path: '/login' });
};

const checkAdmin = (to, from, next) =>
  isAdmin.value ? next() : next({ path: '/dashboard' });

const hasAuthToken = (to, from, next) =>
  authToken.value ? next({ path: '/dashboard' }) : next();

const hasAuthTokenLogout = (to, from, next) => {
  if (authToken.value) return next();
};

export default {
  checkLogin,
  checkAdmin,
  hasAuthToken,
  hasAuthTokenLogout,
};
