import axios from 'axios';

import { Types } from '../types';
import { auth } from '../types/namespaces';
import config from '../../config';
import errorHandler from '../plugins/errorHandler';

// todo
// check before commits

const request = axios.create({
  baseURL: `${config.api.url}`,
  timeout: 5000,
});

const state = {
  numOfNotes: 0,
  numOfEditedNotes: 0,
  numOfPublicNotes: 0,
  errorMessage: '',
};

const getters = {
  [Types.getters.GET_NUM_OF_NOTES]: (state) => state.numOfNotes,
  [Types.getters.GET_NUM_OF_EDITED_NOTES]: (state) => state.numOfEditedNotes,
  [Types.getters.GET_NUM_OF_PUBLIC_NOTES]: (state) => state.numOfPublicNotes,
  [Types.getters.GET_ERROR_MESSAGE]: (state) => state.errorMessage,
};

const actions = {
  [Types.actions.FETCH_NUM_OF_NOTES]: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/statistics/num-of-notes', {
        headers: {
          Authorization: `Bearer ${
            rootGetters[auth + Types.getters.GET_AUTHTOKEN]
          }`,
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
          Authorization: `Bearer ${
            rootGetters[auth + Types.getters.GET_AUTHTOKEN]
          }`,
        },
      });

      commit(Types.mutations.SET_NUM_OF_EDITED_NOTES, response.numOfEdited);
    } catch (error) {
      console.log(error);
      errorHandler(error, commit);
    }
  },

  [Types.actions.FETCH_PUBLIC_NOTES]: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/statistics/public-notes', {
        headers: {
          Authorization: `Bearer ${
            rootGetters[auth + Types.getters.GET_AUTHTOKEN]
          }`,
        },
      });

      commit(
        Types.mutations.SET_NUM_OF_PUBLIC_NOTES,
        response.numOfPublicNotes
      );
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
  [Types.mutations.SET_NUM_OF_PUBLIC_NOTES]: (state, value) =>
    (state.numOfPublicNotes = value),
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
