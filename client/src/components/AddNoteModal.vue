<template>
  <div
    class="modal fade"
    id="addNoteModal"
    tabindex="-1"
    aria-labelledby="addNoteModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addNoteModal">Add your note</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <display-message :message="message"></display-message>

          <div class="mt-3">
            <form @submit.prevent="insertNote" class="text-black">
              <div class="mb-3">
                <label for="inputTitle" class="form-label">Note title</label>
                <input
                  v-model="newNote.title"
                  type="text"
                  class="form-control"
                  id="inputTitle"
                  placeholder="Enter the title of your note."
                  aria-placeholder="Enter the title of your note."
                  required
                />
              </div>

              <div class="mb-3">
                <label for="inputNote" class="form-label">Note</label>
                <textarea
                  v-model="newNote.note"
                  class="form-control"
                  id="inputNote"
                  placeholder="Enter your note."
                  aria-placeholder="Enter your note."
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

import { Types } from '../store/types';
import { notes } from '../store/types/namespaces';

import useDisplayMessage from '../composables/useDisplayMessage';
import schemas from '../config/schemas';

import displayMessage from '../components/DisplayMessage.vue';

export default {
  name: 'AddNoteModal',

  components: {
    displayMessage,
  },

  setup() {
    // composables
    const { msgTypes, message, setDisplayMessage } = useDisplayMessage();

    // schemas
    const { insert: schema } = schemas.note;

    // store
    const store = useStore();

    // vuex
    const errorMessage = computed(
      () => store.getters[`${notes}${Types.getters.GET_ERROR_MESSAGE}`]
    );

    const insertNoteStore = (payload) =>
      store.dispatch(`${notes}${Types.actions.INSERT_NOTE}`, payload);

    const setErrorMessage = (message) =>
      store.commit(`${notes}${Types.mutations.SET_ERROR_MESSAGE}`, message);

    // refs | local state
    const newNote = ref({
      title: '',
      note: '',
    });

    // functions
    const resetErrorMessage = () => {
      if (errorMessage.value) setErrorMessage('');
    };

    const resetForm = () => {
      newNote.value.title = '';
      newNote.value.note = '';
    };

    const hideForm = () => {
      const modalEl = document.getElementById('addNoteModal');
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

      modal.hide();
    };

    const validNote = async () => {
      try {
        await schema.validateAsync(newNote.value);
        return true;
      } catch (error) {
        setErrorMessage(error.message);
        return false;
      }
    };

    const insertNote = async () => {
      resetErrorMessage();

      if (!(await validNote())) return;
      await insertNoteStore(newNote.value);

      resetForm();
      hideForm();
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
      message,
      insertNote,
    };
  },
};
</script>

<style></style>
