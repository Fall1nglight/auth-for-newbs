<template>
  <Navbar />

  <div class="container pt-5">
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },

  setup() {},
};
</script>

<style>
body {
  background-color: #cf995f;
}
</style>
