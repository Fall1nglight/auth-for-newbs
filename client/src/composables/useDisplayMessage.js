import { ref } from 'vue';

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
    message.value.message = msg;
    message.value.type = type || '';
  };

  return {
    msgTypes,
    message,
    setDisplayMessage,
  };
}
