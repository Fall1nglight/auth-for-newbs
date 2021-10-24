<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <Note
      @toggleNoteReminder="$emit('toggleNoteReminder', $event)"
      @editNote="$emit('editNote', $event)"
      @deleteNote="$emit('deleteNote', $event)"
      v-for="note in notes"
      :note="note"
      :key="note._id"
    />
  </div>
</template>

<script>
import Note from './Note.vue';

export default {
  name: 'Notes',
  components: {
    Note,
  },
  props: {
    notes: Array,
  },
  emits: ['toggleNoteReminder', 'editNote', 'deleteNote'],
};
</script>

<style></style>
