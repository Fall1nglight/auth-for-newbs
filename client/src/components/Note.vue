<template>
  <div class="col">
    <div
      :class="[
        'card h-100 border-0 border-start border-3',
        note.public ? 'border-success' : 'border-danger',
      ]"
    >
      <!-- add hover texts -->
      <div class="card-header">
        <div class="d-flex justify-content-end" id="controls">
          <a
            @click="updatePublicState(note)"
            title="Set note to public or private"
            ><i class="bi bi-check2-circle text-success"></i
          ></a>

          <a @click="editState = !editState" class="mx-3" title="Edit note"
            ><i class="bi bi-wrench text-warning"></i
          ></a>

          <a @click="deleteNote(note._id)" title="Delete note"
            ><i class="bi bi-x-lg text-danger"></i
          ></a>
        </div>
      </div>

      <div v-if="!editState" class="card-body">
        <h5 class="card-title mb-3">{{ note.title }}</h5>
        <p class="card-text">{{ note.note }}</p>
      </div>

      <div v-if="editState" class="card-body">
        <form @submit.prevent="editNote(note._id)">
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
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

import { Types } from '../store/types';
import { notes } from '../store/types/namespaces';

import useFormatDate from '../composables/useFormatDate';
import useDisplayMessage from '../composables/useDisplayMessage';

export default {
  name: 'Note',
  props: {
    note: Object,
  },

  setup(props) {
    // composables
    const { formatDate } = useFormatDate();
    const { msgTypes, displayMessage, setDisplayMessage } = useDisplayMessage();

    // store
    const store = useStore();

    // vuex
    const errorMessage = computed(
      () => store.getters[`${notes}${Types.getters.GET_ERROR_MESSAGE}`]
    );

    const editNoteAction = (payload) =>
      store.dispatch(`${notes}${Types.actions.EDIT_NOTE}`, payload);

    const deleteNoteAction = (id) =>
      store.dispatch(`${notes}${Types.actions.DELETE_NOTE}`, id);

    const setErrorMessage = (message) =>
      store.commit(`${notes}${Types.mutations.SET_ERROR_MESSAGE}`);

    // refs | local state
    const newNote = ref({
      title: props.note.title,
      note: props.note.note,
    });

    const editState = ref(false);

    // functions

    // ? reset all errors
    const resetErrorMessage = () => {
      if (errorMessage.value) setErrorMessage('');
    };

    const updatePublicState = async ({ _id: id, public: pub }) => {
      try {
        resetErrorMessage();

        await editNoteAction({ id, public: !pub });
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    const editNote = async (id) => {
      resetErrorMessage();
      editState.value = false;

      await editNoteAction({
        id,
        title: newNote.value.title,
        note: newNote.value.note,
      });
    };

    const deleteNote = async (id) => {
      if (!confirm('Are you sure you want to delete this note?')) return;
      resetErrorMessage();

      await deleteNoteAction(id);
    };

    // watch
    watch(newNote.value, () => {
      resetErrorMessage();
    });

    watch(errorMessage, () => {
      setDisplayMessage(errorMessage.value, msgTypes.error);
    });

    // expose
    return {
      newNote,
      editState,
      formatDate,
      updatePublicState,
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
