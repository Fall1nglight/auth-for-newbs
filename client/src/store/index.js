import { createStore } from 'vuex';
import auth from './modules/auth';
import notes from './modules/notes';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    notes,
  },
});
