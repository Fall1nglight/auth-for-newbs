<template>
  <div class="row mb-3 justify-content-between">
    <div class="col-md-5 text-black">
      <div class="h1">Dashboard</div>
    </div>

    <div class="col-md-5">
      <display-message :message="message"></display-message>

      <div class="form-check form-switch" id="switchButton">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          @click="formVisibility = !formVisibility"
          :checked="formVisibility"
        />
        <label class="form-check-label text-black" for="flexSwitchCheckDefault"
          >Toggle form</label
        >
      </div>

      <div class="mt-3" v-if="formVisibility">
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
  </div>

  <notes></notes>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

import { Types } from '../store/types';
import { notes } from '../store/types/namespaces';

import useDisplayMessage from '../composables/useDisplayMessage';
import schemas from '../config/schemas';

import DisplayMessage from '../components/DisplayMessage.vue';
import Notes from '../components/Notes.vue';

export default {
  name: 'Dashboard',
  components: {
    DisplayMessage,
    Notes,
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

    const formVisibility = ref(false);

    // functions
    const resetErrorMessage = () => {
      if (errorMessage.value) setErrorMessage('');
    };

    const resetForm = () => {
      newNote.value.title = '';
      newNote.value.note = '';
      formVisibility.value = false;
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
      formVisibility,
      message,
      insertNote,
    };
  },
};
</script>

<style scoped>
#flexSwitchCheckDefault:hover,
.form-check-label:hover {
  cursor: pointer;
}
</style>
