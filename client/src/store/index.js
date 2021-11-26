import { createStore } from 'vuex';

import auth from './modules/auth';
import notes from './modules/notes';
import admin from './modules/admin';
import statistics from './modules/statistics';
import pub from './modules/public';

export default createStore({
  state: {},
  mutations: {},
  actions: {},

  modules: {
    auth,
    notes,
    admin,
    statistics,
    public: { ...pub },
  },
});
