<template>
  <Navbar />

  <div class="container pt-5">
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },

  setup() {},
};
</script>

<style></style>
