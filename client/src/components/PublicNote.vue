<template>
  <div class="col">
    <div
      :class="[
        'card h-100 border-0 border-start border-3',
        note.reminder ? 'border-success' : 'border-danger',
      ]"
    >
      <div class="card-body">
        <h5 class="card-title mb-3">{{ note.title }}</h5>
        <p class="card-text">{{ note.note }}</p>
      </div>

      <div class="card-footer">
        <small class="text-muted d-flex w-100"
          >Created {{ formatDate(note.createdAt) }} ago</small
        >
        <small v-if="note.updatedAt" class="text-muted"
          >Last updated {{ formatDate(note.updatedAt) }} ago</small
        >
      </div>
    </div>
  </div>
</template>

<script>
import useFormatDate from '../composables/useFormatDate';

export default {
  name: 'PublicNote',
  props: {
    note: Object,
  },

  setup() {
    // composables
    const { formatDate } = useFormatDate();

    // expose
    return { formatDate };
  },
};
</script>

<style></style>
