import axios from 'axios';

import config from '../../config';

// gondolatmenet
// ellenőrizzük az adatokat, ha helyes meghívjuk a signup-ot
// a store-ban
// ha sikeres a regisztráció visszakapunk egy JWT-t és
// beállítjuk a state.authToken-re
// ! login és signup után commit('checkUser'), a state.user miatt

// az authTokent alapból a localStorage-ből olvassuk ki
// de ha nem állítjuk be, akkor gond van

// ha signup/login után beállíjuk a localStorage.token-t is
// akkor megoldódik a probléma

// ? mi van akkor ha módosítják a localStorage.token-t ?
// ? mikor kell meghívni a checkUser-t
// ha checkUser nem volt sikeres -> state.user = '' / null

// ha /dashboard előtt mindig meghívjuk a checkUser-t
// akkor a ratelimiter le fog tiltani

// ? hasAuthToken getter
// ? ha van true, akkor továbbenged, ha nem, akkor /login-ra irányít
// ? komponensenként kell azonosítani a felhasználót

const request = axios.create({
  baseURL: `${config.auth.url}`,
  timeout: 5000,
});

const state = {
  authToken: localStorage.token || '',
  user: '',
  errorMessage: '',
};

const getters = {
  getAuthToken: (state) => state.authToken,
  isLoggedIn: (state) => !!state.user,
  hasAuthToken: (state) => !!state.authToken,
};

const actions = {
  checkUser: async ({ commit, getters }) => {
    try {
      console.log('incoming token:', getters.getAuthToken);

      const { data: response } = await request.get('/checkuser', {
        headers: { Authorization: `Bearer ${getters.getAuthToken}` },
      });

      commit('setUser', response.user);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      commit('setErrorMessage', message);
    }
  },

  signup: async ({ commit, dispatch }, { username, password }) => {
    try {
      const { data: response } = await request.post('/signup', {
        username,
        password,
      });

      // ha meghívjuk a checkUser-t előtte be kell állítani a token
      commit('setAuthToken', response.token);
      dispatch('checkUser');
    } catch ({
      response: {
        data: { message },
      },
    }) {
      commit('setErrorMessage', message);
    }
  },

  login: async ({ commit, dispatch }, user) => {
    try {
      const { data: response } = await request.post('/login', user);

      commit('setAuthToken', response.token);
      dispatch('checkUser');
    } catch ({
      response: {
        data: { message },
      },
    }) {
      commit('setErrorMessage', message);
    }
  },
};

const mutations = {
  setAuthToken: (state, token) => {
    state.authToken = token;
    localStorage.token = token;
  },
  setUser: (state, user) => (state.user = user),
  setErrorMessage: (state, message) => (state.errorMessage = message),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
