import axios from 'axios';

import config from '../../config';
import errorHandler from '../plugins/errorHandler';

const request = axios.create({
  baseURL: `${config.api.url}`,
  timeout: 5000,
});

const state = {
  notes: [],
  users: [],
  errorMessage: '',
};

const getters = {
  notes: (state) => state.notes,
  numOfNotes: (state) => state.notes.length,
  users: (state) => state.users,
  numOfUsers: (state) => state.users.length,
  errorMessage: (state) => state.errorMessage,
};

const actions = {
  fetchAllNotes: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/notes/all', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/authToken']}`,
        },
      });

      commit('setNotes', response.allNotes);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  fetchAllUsers: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/users', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/authToken']}`,
        },
      });

      commit('setUsers', response.allUsers);
    } catch (error) {
      errorHandler(error, commit);
    }
  },
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  setNotes: (state, notes) => (state.notes = notes),
  setErrorMessage: (state, message) => (state.errorMessage = message),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
