import axios from 'axios';

import config from '../../config';
import errorHandler from '../plugins/errorHandler';

const request = axios.create({
  baseURL: `${config.api.url}`,
  timeout: 5000,
});

const state = {
  numOfEditedNotes: 0,
  numOfMarkedDoneNotes: 0,
};

const getters = {
  numOfEditedNotes: (state) => state.numOfEditedNotes,
  numOfMarkedDoneNotes: (state) => state.numOfMarkedDoneNotes,
};

const actions = {
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
  setNumOfMarkedDoneNotes: (state, value) =>
    (state.numOfMarkedDoneNotes = value),
  setNumOfEditedNotes: (state, value) => (state.numOfEditedNotes = value),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
