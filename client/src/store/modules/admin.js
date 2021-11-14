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
  userByName: (state) => (username) =>
    state.users.filter((user) => user.username === username),
  numOfUsers: (state) => state.users.length,
  errorMessage: (state) => state.errorMessage,
};

const actions = {
  // todo | move this to statistics
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

  updateUser: async ({ commit, rootGetters }, user) => {
    try {
      // extract id then delete it to pass the backend validation
      const { id, modifiedUser: userToUpdate } = user;
      delete user.id;

      const { data: response } = await request.patch(
        `/users/${id}`,
        userToUpdate,
        {
          headers: {
            Authorization: `Bearer ${rootGetters['auth/authToken']}`,
          },
        }
      );

      if (!response.updatedUser) return;

      commit('updateUser', response.updatedUser);
    } catch (error) {
      errorHandler(error, commit);
    }
  },
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  updateUser: (state, userToUpdate) =>
    (state.users = state.users.map((user) =>
      user._id === userToUpdate._id ? userToUpdate : user
    )),
  setNotes: (state, notes) => (state.notes = notes),
  setErrorMessage: (state, message) => (state.errorMessage = message),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
