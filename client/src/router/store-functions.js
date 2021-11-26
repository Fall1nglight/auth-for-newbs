import store from '../store';

import { Types } from '../store/types';
import { auth, notes, admin, pub, statistics } from '../store/types/namespaces';

const checkUser = () => store.dispatch(`${auth}${Types.actions.CHECK_USER}`);
const fetchNotes = () => store.dispatch(`${notes}${Types.actions.FETCH_NOTES}`);
const fetchPublicNotes = () =>
  store.dispatch(`${pub}${Types.actions.FETCH_NOTES}`);

const fetchAllUsers = () =>
  store.dispatch(`${admin}${Types.actions.FETCH_ALL_USERS}`);

const fetchStatistics = () => {
  store.dispatch(`${statistics}${Types.actions.FETCH_NUM_OF_NOTES}`);
  store.dispatch(`${statistics}${Types.actions.FETCH_EDITED_NOTES}`);
  store.dispatch(`${statistics}${Types.actions.FETCH_PUBLIC_NOTES}`);
};

export default {
  checkUser,
  fetchNotes,
  fetchPublicNotes,
  fetchAllUsers,
  fetchStatistics,
};
