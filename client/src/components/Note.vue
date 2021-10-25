<template>
  <div class="col">
    <div
      :class="[
        'card h-100 border-0 border-start border-3',
        note.reminder ? 'border-success' : 'border-danger',
      ]"
    >
      <div class="card-header">
        <div class="d-flex justify-content-end" id="controls">
          <a @click="toggleNoteReminder"
            ><i class="bi bi-check2-circle text-success"></i
          ></a>

          <a @click="editState = !editState" class="mx-3"
            ><i class="bi bi-wrench text-warning"></i
          ></a>

          <a @click="deleteNote"><i class="bi bi-x-lg text-danger"></i></a>
        </div>
      </div>

      <div v-if="!editState" class="card-body">
        <h5 class="card-title mb-3">{{ note.title }}</h5>
        <p class="card-text">{{ note.note }}</p>
      </div>

      <div v-if="editState" class="card-body">
        <form @submit.prevent="editNote">
          <div class="mb-3">
            <input
              v-model="newNote.title"
              type="text"
              class="form-control"
              id="inputTitle"
              placeholder="Enter the title of your note."
              aria-placeholder="Enter the title of your note."
            />
          </div>

          <div class="mb-3">
            <textarea
              v-model="newNote.note"
              class="form-control"
              id="inputNote"
              placeholder="Enter your note."
              aria-placeholder="Enter your note."
              rows="3"
            ></textarea>
          </div>

          <div>
            <button type="submit" class="btn btn-primary">Edit</button>
          </div>
        </form>
      </div>

      <div class="card-footer">
        <small class="text-muted d-flex w-100"
          >Created {{ formatDate(createdAt) }} ago</small
        >
        <small v-if="updatedAt" class="text-muted"
          >Last updated {{ formatDate(updatedAt) }} ago</small
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/reactivity';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default {
  name: 'Note',
  props: {
    note: Object,
  },
  emits: ['toggleNoteReminder', 'editNote', 'deleteNote'],

  setup(props, { emit }) {
    // refs
    const newNote = ref({
      title: props.note.title,
      note: props.note.note,
    });

    const editState = ref(false);

    // functions
    const toggleNoteReminder = () => {
      emit('toggleNoteReminder', props.note);
    };

    const editNote = () => {
      emit('editNote', { ...props.note, ...newNote.value });
      editState.value = false;
    };

    const deleteNote = () => {
      emit('deleteNote', props.note);
    };

    const formatDate = (date) => formatDistanceToNow(new Date(date));

    //computed
    const createdAt = computed(() => props.note.createdAt);
    const updatedAt = computed(() => props.note.updatedAt);

    // expose
    return {
      newNote,
      editState,
      createdAt,
      updatedAt,
      formatDate,
      toggleNoteReminder,
      editNote,
      deleteNote,
    };
  },
};
</script>

<style scoped>
div#controls > a {
  cursor: pointer;
}
</style>
