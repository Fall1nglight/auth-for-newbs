// functions
const setDisplayMessage = (msg, msgType) => {
  displayMsg.value.message = msg;
  displayMsg.value.type = msgType || '';
};

export default {
  setDisplayMessage,
};
