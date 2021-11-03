import axios from 'axios';

const state = {
  authToken: '',
};

const getters = {
  getAuthToken: (state) => state.authToken,
};

const actions = {
  signup: async ({ commit }, user) => {
    try {
      // todo create axios instance
      // todo revise vuex
      // todo add signup, login actions
      // todo store user data inside vuex
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
