import axios from 'axios';

import { Types } from '../types';
import { auth } from '../types/namespaces';
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
  [Types.actions.FETCH_NOTES]: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/notes', {
        headers: {
          Authorization: `Bearer ${
            rootGetters[auth + Types.getters.GET_AUTHTOKEN]
          }`,
        },
      });

      commit(Types.mutations.SET_NOTES, response.userNotes);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  [Types.actions.INSERT_NOTE]: async ({ commit, rootGetters }, note) => {
    try {
      const { data: response } = await request.post('/notes', note, {
        headers: {
          Authorization: `Bearer ${
            rootGetters[auth + Types.getters.GET_AUTHTOKEN]
          }`,
        },
      });

      commit(Types.mutations.ADD_NOTE, response.newNote);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  [Types.actions.EDIT_NOTE]: async ({ commit, rootGetters }, note) => {
    try {
      const { id } = note;
      delete note.id;

      const { data: response } = await request.patch(
        `/notes/${id}`,
        { ...note },
        {
          headers: {
            Authorization: `Bearer ${
              rootGetters[auth + Types.getters.GET_AUTHTOKEN]
            }`,
          },
        }
      );

      commit(Types.mutations.EDIT_NOTE, response.updatedNote);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  [Types.actions.DELETE_NOTE]: async ({ commit, rootGetters }, id) => {
    try {
      const { data: response } = await request.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${
            rootGetters[auth + Types.getters.GET_AUTHTOKEN]
          }`,
        },
      });

      if (response.success) commit(Types.mutations.DELETE_NOTE, id);
    } catch (error) {
      errorHandler(error, commit);
    }
  },
};

const mutations = {
  [Types.mutations.SET_NOTES]: (state, notes) => (state.notes = notes),
  [Types.mutations.ADD_NOTE]: (state, note) => state.notes.push(note),
  [Types.mutations.EDIT_NOTE]: (state, newNote) => {
    state.notes = state.notes.map((note) =>
      // if the requested note is found, update it else return the original note
      note._id === newNote._id ? newNote : note
    );
  },
  [Types.mutations.DELETE_NOTE]: (state, id) => {
    state.notes = state.notes.filter((note) => note._id !== id);
  },
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
