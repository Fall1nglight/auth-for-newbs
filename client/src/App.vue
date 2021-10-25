<template>
  <Navbar />

  <div class="container pt-5">
    <router-view />
  </div>
</template>

<script>
import { provide } from '@vue/runtime-core';

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const bootstrapTypes = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  error: 'danger',
  warning: 'warning',
  info: 'info',
  light: 'light',
  dark: 'dark',
};

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },

  setup() {
    provide('bootstrapTypes', bootstrapTypes);
  },
};
</script>

<style>
body {
  background-color: #cf995f;
}
</style>
