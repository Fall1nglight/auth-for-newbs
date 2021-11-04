import axios from 'axios';

import config from '../../config';

// gondolatmenet
// ellenőrizzük az adatokat, ha helyes meghívjuk a signup-ot
// a store-ban
// ha sikeres a regisztráció visszakapunk egy JWT-t és
// beállítjuk a state.authToken-re

// az authTokent alapból a localStorage-ből olvassuk ki
// de ha nem állítjuk be, akkor gond van

// ha signup/login után beállíjuk a localStorage.token-t is
// akkor megoldódik a probléma

// ? mi van akkor ha módosítják a localStorage.token-t ?
// ? mikor kell meghívni a checkUser-t
// ! login és signup után commit('checkUser'), a state.user miatt

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

  // ! state.user
  isLoggedIn: (state) => !!state.user,
};

const actions = {
  checkUser: async ({ commit }, token) => {
    try {
      console.log('incoming token:', token);

      const { data: response } = await request.get('/checkuser', {
        headers: { Authorization: `Bearer ${token}` },
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

  signup: async ({ commit }, { username, password }) => {
    try {
      const { data: response } = await request.post('/signup', {
        username,
        password,
      });

      commit('setAuthToken', response.token);
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
