<template> </template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  name: 'Logout',

  setup() {
    // store
    const store = useStore();

    //vuex
    const logoutAction = () => store.dispatch('auth/logout');

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
