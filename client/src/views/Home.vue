<template>
  <div class="row mb-3 justify-content-center">
    <div class="h3">Public Notes</div>
  </div>

  <public-notes></public-notes>
</template>

<script>
import PublicNotes from '../components/PublicNotes.vue';

export default {
  name: 'Home',
  components: {
    PublicNotes,
  },
};
</script>
