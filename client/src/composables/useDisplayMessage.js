import { ref } from '@vue/runtime-core';

export default function useDisplayMessage() {
  const msgTypes = {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    error: 'danger',
    warning: 'warning',
    info: 'info',
    light: 'light',
    dark: 'dark',
  };

  const message = ref({
    message: '',
    type: '',
  });

  const setDisplayMessage = (msg, type) => {
    console.log('called with value', msg);
    message.value.message = msg;
    message.value.type = type || '';
  };

  return {
    msgTypes,
    message,
    setDisplayMessage,
  };
}
