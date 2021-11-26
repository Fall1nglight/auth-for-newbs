<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
    <stat :icon="'people-fill'" :value="numOfUsers">Total Users</stat>
    <stat :icon="'card-text'" :value="numOfNotes">Total Notes</stat>
    <stat :icon="'pencil-square'" :value="numOfEditedNotes">Total Edits</stat>
    <stat :icon="'card-checklist'" :value="numOfPublicNotes"
      >Total Public Notes</stat
    >
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { Types } from '../store/types';
import { admin, statistics } from '../store/types/namespaces';

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
    const numOfUsers = computed(
      () => store.getters[`${admin}${Types.getters.GET_NUM_OF_USERS}`]
    );

    const numOfNotes = computed(
      () => store.getters[`${statistics}${Types.getters.GET_NUM_OF_NOTES}`]
    );

    const numOfEditedNotes = computed(
      () =>
        store.getters[`${statistics}${Types.getters.GET_NUM_OF_EDITED_NOTES}`]
    );

    const numOfPublicNotes = computed(
      () =>
        store.getters[`${statistics}${Types.getters.GET_NUM_OF_PUBLIC_NOTES}`]
    );

    // expose
    return {
      numOfUsers,
      numOfNotes,
      numOfEditedNotes,
      numOfPublicNotes,
    };
  },
};
</script>

<style></style>
