import axios from 'axios';

import config from '../../config';
import errorHandler from '../plugins/errorHandler';

const request = axios.create({
  baseURL: `${config.api.url}`,
  timeout: 5000,
});

const state = {
  allNotes: [],
  allUsers: [],
  errorMessage: '',
};

const getters = {
  getAllNotes: (state) => state.allNotes,

  // todo | need to test this
  getNoteById: (state, id) => state.allNotes.filter((note) => note._id === id),
};

const actions = {
  fetchAllNotes: async ({ commit }) => {
    try {
      // const {data: response} = await request.get('/')
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  fetchAllUsers: async ({ commit }) => {
    try {
      const { data: response } = await request.get('/users');

      commit('setUsers', response.allUsers);
    } catch (error) {
      errorHandler(error, commit);
    }
  },
};

const mutations = {
  setUsers: (state, users) => (state.allUsers = users),
  setErrorMessage: (state, message) => (state.errorMessage = message),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
