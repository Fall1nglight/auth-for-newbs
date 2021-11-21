import axios from 'axios';

import { Types } from '../types';
import config from '../../config';
import errorHandler from '../plugins/errorHandler';

const request = axios.create({
  baseURL: `${config.auth.url}`,
  timeout: 5000,
});

const state = {
  authToken: localStorage.token || '',
  user: {},
  errorMessage: '',
};

const getters = {
  [Types.getters.GET_AUTHTOKEN]: (state) => state.authToken,
  [Types.getters.GET_USER]: (state) => state.user,
  [Types.getters.GET_USER_ID]: (state) => state.user._id,
  [Types.getters.IS_LOGGED_IN]: (state) => !!state.user._id,
  [Types.getters.IS_ADMIN]: (state) =>
    state.user.role === 'admin' ? true : false,
  [Types.getters.GET_ERROR_MESSAGE]: (state) => state.errorMessage,
};

const actions = {
  [Types.actions.CHECK_USER]: async ({ commit, dispatch, state }) => {
    try {
      const { data: response } = await request.get('/checkuser', {
        headers: { Authorization: `Bearer ${state.authToken}` },
      });

      if (response.user) return commit(Types.mutations.SET_USER, response.user);
      dispatch(Types.actions.LOGOUT);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  [Types.actions.SIGNUP]: async ({ commit }, { username, password }) => {
    try {
      const { data: response } = await request.post('/signup', {
        username,
        password,
      });

      commit(Types.mutations.SET_AUTH_TOKEN, response.token);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  [Types.actions.LOGIN]: async ({ commit }, user) => {
    try {
      const { data: response } = await request.post('/login', user);

      commit(Types.mutations.SET_AUTH_TOKEN, response.token);
    } catch (error) {
      errorHandler(error, commit);
    }
  },

  [Types.actions.LOGOUT]: ({ commit }) => {
    commit(Types.mutations.SET_AUTH_TOKEN, '');
    commit(Types.mutations.SET_USER, {});
  },
};

const mutations = {
  [Types.mutations.SET_AUTH_TOKEN]: (state, token) => {
    state.authToken = token;
    localStorage.token = token;
  },
  [Types.mutations.SET_USER]: (state, user) => (state.user = user),
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
