import axios from 'axios';

import config from '../../config';
import errorHandler from '../plugins/errorHandler';

const request = axios.create({
  baseURL: `${config.api.url}`,
  timeout: 5000,
});

const state = {
  notes: [],
  errorMessage: '',
};

const getters = {
  notes: (state) => state.notes,
  errorMessage: (state) => state.errorMessage,
};

const actions = {
  fetchNotes: async ({ commit }) => {
    try {
      const { data: response } = await request.get('public/notes');

      commit('setNotes', response.publicNotes);
    } catch (error) {
      errorHandler(error, commit);
    }
  },
};

const mutations = {
  setNotes: (state, notes) => (state.notes = notes),
  setErrorMessage: (state, message) => (state.errorMessage = message),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
