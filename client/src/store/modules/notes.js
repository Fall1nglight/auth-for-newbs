import axios from 'axios';

import config from '../../config';

const request = axios.create({
  baseURL: `${config.api.url}`,
  timeout: 5000,
});

const state = {
  notes: [],
  errorMessage: '',
};

const getters = {};

const actions = {
  fetchNotes: async ({ commit, rootState }) => {
    try {
      const { data: response } = await request.get('/notes', {
        headers: {
          Authorization: `Bearer ${rootState.auth.authToken}`,
        },
      });

      commit('setNotes', response.userNotes);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      commit('setErrorMessage', message);
    }
  },

  fetchNote: async ({ commit }, id) => {},

  insertNote: async ({ commit, rootState }, note) => {
    try {
      const { data: response } = await request.post('/notes', note, {
        headers: {
          Authorization: `Bearer ${rootState.auth.authToken}`,
        },
      });

      commit('addNote', response.newNote);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      commit('setErrorMessage', message);
    }
  },

  // reuse this method as backedn is capable of this
  updateReminder: async ({ commit, rootState }, note) => {
    try {
      const { _id: id, reminder: reminderValue } = note;

      const { data: response } = await request.patch(
        `/notes/${id}`,
        {
          reminder: !reminderValue,
        },
        {
          headers: {
            Authorization: `Bearer ${rootState.auth.authToken}`,
          },
        }
      );

      commit('editNote', response.updatedNote);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      commit('setErrorMessage', message);
    }
  },

  deleteNote: async ({ commit, rootState }, id) => {
    try {
      const { data: response } = await request.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${rootState.auth.authToken}`,
        },
      });

      if (response.success) commit('deleteNote', id);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      commit('setErrorMessage', message);
    }
  },
};

const mutations = {
  setNotes: (state, notes) => (state.notes = notes),
  addNote: (state, note) => state.notes.push(note),
  editNote: (state, newNote) => {
    state.notes = state.notes.map((note) =>
      // if the requested note is found, update it else return the original note
      note._id === newNote._id ? { ...state.note, ...newNote } : note
    );
  },
  deleteNote: (state, id) => {
    state.notes = state.notes.filter((note) => note._id !== id);
  },
  setErrorMessage: (state, message) => (state.errorMessage = message),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
