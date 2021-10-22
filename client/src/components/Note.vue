<template>
  <div class="col">
    <div class="card h-100">
      <div class="card-header">
        <div class="d-flex justify-content-end" id="controls">
          <a @click="deleteNote"><i class="bi bi-x-lg text-danger"></i></a>
          <a @click="editNote" class="mx-3"
            ><i class="bi bi-wrench text-warning"></i
          ></a>
          <a @click="markNoteDone"
            ><i class="bi bi-check2-circle text-success"></i
          ></a>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ note.title }}</h5>
        <p class="card-text">{{ note.note }}</p>
      </div>
      <div class="card-footer">
        <!-- add a date parser -->
        <small class="text-muted">Created at {{ note.createdAt }}</small>
      </div>
    </div>
  </div>
</template>

<script>
// todo list
// 1. add click listeners and functions
// 2. user should be able to delete the note -> verification popup
// 3. user should be able to mark note as done
// 4. user should be able to modify the note -> rendered title and text becomes input and textarea
// 'expose' comments inside other components setup function

export default {
  name: 'Note',
  props: {
    note: Object,
    key: String,
  },

  setup(props) {
    // refs
    // functions
    // expose
    return {};
  },
};
</script>

<style scoped>
div#controls > a {
  cursor: pointer;
}
</style>
