<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
    <stat :icon="'people-fill'" :value="13">Total Users</stat>
    <stat :icon="'card-text'" :value="67">Total Notes</stat>
    <stat :icon="'pencil-square'" :value="23">Total Edits</stat>
    <stat :icon="'card-checklist'" :value="39">Marked Done</stat>
  </div>
</template>

<script>
// todo | add admin / users module to vuex
// todo | add methods
// todo | correct css layout
// todo | center div insede card

import Stat from './Stat.vue';

export default {
  name: 'Stats',
  components: {
    Stat,
  },
};
</script>

<style></style>
