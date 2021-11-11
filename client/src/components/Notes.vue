<template>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <Note v-for="note in notes" :note="note" :key="note._id" />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import Note from './Note.vue';

export default {
  name: 'Notes',
  components: {
    Note,
  },

  setup() {
    // store
    const store = useStore();

    // vuex state
    const notes = computed(() => store.getters['notes/notes']);
    return { notes };
  },
};
</script>

<style></style>
