<template>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <Note v-for="note in userNotes" :note="note" :key="note._id" />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

import { notes } from '../store/types/namespaces';

import Note from './Note.vue';
import { Types } from '../store/types';

export default {
  name: 'Notes',
  components: {
    Note,
  },

  setup() {
    // store
    const store = useStore();

    // vuex state
    const userNotes = computed(
      () => store.getters[`${notes}${Types.getters.GET_NOTES}`]
    );

    return { userNotes };
  },
};
</script>

<style></style>
