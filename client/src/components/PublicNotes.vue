<template>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <public-note
      v-for="note in publicNotes"
      :note="note"
      :key="note._id"
    ></public-note>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

import PublicNote from '../components/PublicNote.vue';

export default {
  name: 'PublicNotes',
  components: {
    PublicNote,
  },

  setup() {
    // store
    const store = useStore();

    // vuex
    const publicNotes = computed(() => store.getters['public/notes']);

    // expose
    return {
      publicNotes,
    };
  },
};
</script>

<style></style>
