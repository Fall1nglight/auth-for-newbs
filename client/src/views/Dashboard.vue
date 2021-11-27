<template>
  <div class="row mb-3 justify-content-between">
    <div class="col-md-5 text-black">
      <div class="h1">Dashboard</div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addNoteModal"
        >
          Add note <i class="bi bi-pencil-square"></i>
        </button>
      </div>
    </div>
  </div>

  <notes></notes>
</template>

<script>
import Notes from '../components/Notes.vue';

export default {
  name: 'Dashboard',
  components: { Notes },
};
</script>

<style></style>
