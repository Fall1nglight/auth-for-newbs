<template> </template>

<script>
import { useRouter } from 'vue-router';
import { useActions } from '../helpers';
export default {
  name: 'Logout',

  setup() {
    //vuex
    const { logout: logoutAction } = useActions(['logout']);

    //router
    const router = useRouter();

    //function(s)
    const logout = () => {
      logoutAction();
      router.push({ path: '/login' });
    };

    logout();
  },
};
</script>

<style></style>
