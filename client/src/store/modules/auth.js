import axios from 'axios';

import config from '../../config';

// todo create axios instance
// todo revise vuex
// todo add signup, login actions
// todo store user data inside vuex

const request = axios.create({
  baseURL: `${config.auth.url}`,
  timeout: 5000,
});

const state = {
  authToken: '',
};

const getters = {
  getAuthToken: (state) => state.authToken,
};

const actions = {
  signup: async ({ commit }, user) => {
    try {
      // todo | find a cleaner way to do this
      const { username, password } = user;

      console.log(user);
      const { data: response } = await request.post('/signup', {
        username,
        password,
      });

      commit('setAuthToken', response.token);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  setAuthToken: (state, token) => (state.authToken = token),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
