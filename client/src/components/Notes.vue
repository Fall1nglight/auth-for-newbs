<template>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <Note v-for="note in notes" :note="note" :key="note._id" />
  </div>
</template>

<script>
import { useState } from '../helpers';

import Note from './Note.vue';

export default {
  name: 'Notes',
  components: {
    Note,
  },

  setup() {
    // vuex state
    const { notes } = useState('notes', ['notes']);

    return { notes };
  },
};
</script>

<style></style>
