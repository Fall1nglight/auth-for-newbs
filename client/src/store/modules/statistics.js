import axios from 'axios';

import { Types } from '../types';
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
  [Types.getters.GET_NUM_OF_NOTES]: (state) => state.numOfNotes,
  [Types.getters.GET_NUM_OF_EDITED_NOTES]: (state) => state.numOfEditedNotes,
  [Types.getters.GET_NUM_OF_MARKED_DONE_NOTES]: (state) =>
    state.numOfMarkedDoneNotes,
  [Types.getters.GET_ERROR_MESSAGE]: (state) => state.errorMessage,
};

const actions = {
  [Types.actions.FETCH_NUM_OF_NOTES]: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/statistics/num-of-notes', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/authToken']}`,
        },
      });

      commit(Types.mutations.SET_NUM_OF_NOTES, response.numOfNotes);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  [Types.actions.FETCH_EDITED_NOTES]: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/statistics/edited-notes', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/authToken']}`,
        },
      });

      commit(Types.mutations.SET_NUM_OF_EDITED_NOTES, response.value);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  [Types.actions.FETCH_MARKED_DONE_NOTES]: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/statistics/done-notes', {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/authToken']}`,
        },
      });

      commit(Types.mutations.SET_NUM_OF_MARKED_DONE_NOTES, response.value);
    } catch (error) {
      errorHandler(error, commit);
    }
  },
};

const mutations = {
  [Types.mutations.SET_NUM_OF_NOTES]: (state, numOfNotes) =>
    (state.numOfNotes = numOfNotes),
  [Types.mutations.SET_NUM_OF_EDITED_NOTES]: (state, value) =>
    (state.numOfEditedNotes = value),
  [Types.mutations.SET_NUM_OF_MARKED_DONE_NOTES]: (state, value) =>
    (state.numOfMarkedDoneNotes = value),
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
