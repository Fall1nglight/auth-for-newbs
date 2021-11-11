export default function(
  {
    response: {
      data: { message },
    },
  },
  commit
) {
  commit('setErrorMessage', message);
}
