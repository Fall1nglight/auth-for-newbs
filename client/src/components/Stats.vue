<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
    <stat :icon="'people-fill'" :value="numOfUsers">Total Users</stat>
    <stat :icon="'card-text'" :value="numOfNotes">Total Notes</stat>
    <stat :icon="'pencil-square'" :value="numOfEditedNotes">Total Edits</stat>
    <stat :icon="'card-checklist'" :value="numOfMarkedDoneNotes"
      >Marked Done</stat
    >
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
    const numOfUsers = computed(() => store.getters['admin/numOfUsers']);
    const numOfNotes = computed(() => store.getters['admin/numOfNotes']);
    const numOfEditedNotes = computed(
      () => store.getters['statistics/numOfEditedNotes']
    );
    const numOfMarkedDoneNotes = computed(
      () => store.getters['statistics/numOfMarkedDoneNotes']
    );

    // expose
    return {
      numOfUsers,
      numOfNotes,
      numOfEditedNotes,
      numOfMarkedDoneNotes,
    };
  },
};
</script>

<style></style>
