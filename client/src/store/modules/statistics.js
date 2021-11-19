import axios from 'axios';

import config from '../../config';
import errorHandler from '../plugins/errorHandler';

const request = axios.create({
  baseURL: `${config.api.url}`,
  timeout: 5000,
});

const state = {
  numOfNotes: 0,
  numOfEditedNotes: 0,
  numOfMarkedDoneNotes: 0,
  errorMessage: '',
};

const getters = {
  numOfNotes: (state) => state.numOfNotes,
  numOfEditedNotes: (state) => state.numOfEditedNotes,
  numOfMarkedDoneNotes: (state) => state.numOfMarkedDoneNotes,
  errorMessage: (state) => state.errorMessage,
};

const actions = {
  fetchNumberOfNotes: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/statistics/num-of-notes', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/authToken']}`,
        },
      });

      commit('setNumOfNotes', response.numOfNotes);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  fetchEditedNotes: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/statistics/edited-notes', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/authToken']}`,
        },
      });

      commit('setNumOfEditedNotes', response.value);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  fetchMarkedDoneNotes: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/statistics/done-notes', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/authToken']}`,
        },
      });

      commit('setNumOfMarkedDoneNotes', response.value);
    } catch (error) {
      errorHandler(error, commit);
    }
  },
};

const mutations = {
  setNumOfNotes: (state, numOfNotes) => (state.numOfNotes = numOfNotes),
  setNumOfMarkedDoneNotes: (state, value) =>
    (state.numOfMarkedDoneNotes = value),
  setNumOfEditedNotes: (state, value) => (state.numOfEditedNotes = value),
  setErrorMessage: (state, message) => (state.errorMessage = message),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
