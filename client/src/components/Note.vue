<template>
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ note.title }}</h5>
        <p class="card-text">{{ note.note }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: Object,
    key: String,
  },
};
</script>

<style></style>
