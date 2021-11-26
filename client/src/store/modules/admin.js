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
  users: [],
  errorMessage: '',
};

const getters = {
  [Types.getters.GET_USERS]: (state) => state.users,
  [Types.getters.GET_USER_BY_NAME]: (state) => (username) =>
    state.users.filter((user) => user.username === username),
  [Types.getters.GET_NUM_OF_USERS]: (state) => state.users.length,
  [Types.getters.GET_ERROR_MESSAGE]: (state) => state.errorMessage,
};

const actions = {
  [Types.actions.FETCH_ALL_USERS]: async ({ commit, rootGetters }) => {
    try {
      const { data: response } = await request.get('/users', {
        headers: {
          Authorization: `Bearer ${
            rootGetters[auth + Types.getters.GET_AUTHTOKEN]
          }`,
        },
      });

      commit(Types.mutations.SET_USERS, response.allUsers);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  [Types.actions.UPDATE_USER]: async ({ commit, rootGetters }, user) => {
    try {
      // extract id then delete it to pass the backend validation
      const { id, modifiedUser: userToUpdate } = user;
      delete user.id;

      const { data: response } = await request.patch(
        `/users/${id}`,
        userToUpdate,
        {
          headers: {
            Authorization: `Bearer ${
              rootGetters[auth + Types.getters.GET_AUTHTOKEN]
            }`,
          },
        }
      );

      if (!response.updatedUser) return;

      commit(Types.mutations.UPDATE_USER, response.updatedUser);
    } catch (error) {
      errorHandler(error, commit);
    }
  },
};

const mutations = {
  [Types.mutations.SET_USERS]: (state, users) => (state.users = users),
  [Types.mutations.UPDATE_USER]: (state, userToUpdate) =>
    (state.users = state.users.map((user) =>
      user._id === userToUpdate._id ? userToUpdate : user
    )),
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
