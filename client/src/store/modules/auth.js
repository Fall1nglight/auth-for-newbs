import axios from 'axios';

import config from '../../config';

const request = axios.create({
  baseURL: `${config.auth.url}`,
  timeout: 5000,
});

const state = {
  authToken: localStorage.token || '',
  user: {},
  errorMessage: '',
};

const getters = {
  isLoggedIn: (state) => !!state.user._id,
  getUserId: (state) => state.user._id,
};

const actions = {
  checkUser: async ({ commit, dispatch, state }) => {
    try {
      console.log('incoming token:', state.authToken);

      const { data: response } = await request.get('/checkuser', {
        headers: { Authorization: `Bearer ${state.authToken}` },
      });

      if (response.user) return commit('setUser', response.user);
      dispatch('logout');
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

  login: async ({ commit }, user) => {
    try {
      const { data: response } = await request.post('/login', user);

      commit('setAuthToken', response.token);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      commit('setErrorMessage', message);
    }
  },

  logout: ({ commit }) => {
    commit('setAuthToken', '');
    commit('setUser', {});
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
