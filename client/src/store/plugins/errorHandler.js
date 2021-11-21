import { Types } from '../types';

export default function(
  {
    response: {
      data: { message },
    },
  },
  commit
) {
  commit(Types.mutations.SET_ERROR_MESSAGE, message);
}
