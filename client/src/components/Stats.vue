<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
    <stat :icon="'people-fill'" :value="numOfUsers">Total Users</stat>
    <stat :icon="'card-text'" :value="67">Total Notes</stat>
    <stat :icon="'pencil-square'" :value="23">Total Edits</stat>
    <stat :icon="'card-checklist'" :value="39">Marked Done</stat>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import Stat from './Stat.vue';

export default {
  name: 'Stats',
  components: {
    Stat,
  },

  setup() {
    // store
    const store = useStore();

    // vuex
    const notes = computed(() => store.getters['admin/notes']);

    const users = computed(() => store.getters['admin/users']);
    const numOfUsers = computed(() => store.getters['admin/numOfUsers']);

    // expose
    return { notes, users, numOfUsers };
  },
};
</script>

<style></style>
