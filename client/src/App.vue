<template>
  <error-modal></error-modal>
  <add-note-modal></add-note-modal>

  <navbar></navbar>

  <div class="container pt-5">
    <router-view></router-view>
  </div>
</template>

<script>
import ErrorModal from './components/ErrorModal.vue';
import AddNoteModal from './components/AddNoteModal.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    ErrorModal,
    AddNoteModal,
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
