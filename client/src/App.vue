<template>
  <navbar></navbar>

  <div class="container pt-5">
    <router-view></router-view>
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
};
</script>

<style>
body {
  background-color: #cf995f;
}
</style>
