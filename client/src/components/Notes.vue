<template>
  <Note v-for="note in arrayOfNotes" :note="note" :key="note._id" />
</template>

<script>
import Note from './Note';

export default {
  name: 'Notes',
  components: {
    Note,
  },
  props: {
    arrayOfNotes: Array,
  },
};
</script>

<style></style>
