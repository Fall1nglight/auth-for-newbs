import { Types } from '../types';

export default function(error, commit) {
  commit(
    Types.mutations.SET_ERROR_MESSAGE,
    error.response
      ? error.response.data.message
      : `Unknown error (${error.message})`
  );
}
