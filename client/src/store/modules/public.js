import axios from 'axios';

import { Types } from '../types';
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
  [Types.getters.GET_NOTES]: (state) => state.notes,
  [Types.getters.GET_ERROR_MESSAGE]: (state) => state.errorMessage,
};

const actions = {
  [Types.actions.FETCH_NOTES]: async ({ commit }) => {
    try {
      const { data: response } = await request.get('public/notes');

      commit(Types.mutations.SET_NOTES, response.publicNotes);
    } catch (error) {
      errorHandler(error, commit);
    }
  },
};

const mutations = {
  [Types.mutations.SET_NOTES]: (state, notes) => (state.notes = notes),
  [Types.mutations.SET_ERROR_MESSAGE]: (state, message) =>
    (state.errorMessage = message),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
