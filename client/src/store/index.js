import { createStore } from 'vuex';
import auth from './modules/auth';
import notes from './modules/notes';
import admin from './modules/admin';
import statistics from './modules/statistics';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: {
      namespaced: true,
      ...auth,
    },

    notes: {
      namespaced: true,
      ...notes,
    },

    admin: {
      namespaced: true,
      ...admin,
    },

    statistics: {
      namespaced: true,
      ...statistics,
    },
  },
});
