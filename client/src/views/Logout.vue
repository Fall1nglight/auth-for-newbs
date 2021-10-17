<template> </template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: 'Logout',

  setup() {
    //router
    const router = useRouter();

    //function(s)
    const logout = () => {
      if (localStorage.token) localStorage.removeItem('token');
      router.push({ path: 'login' });
    };

    logout();
  },
};
</script>

<style></style>
