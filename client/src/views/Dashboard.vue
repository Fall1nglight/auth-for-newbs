<template>
  <div class="row mb-3 justify-content-between">
    <div class="col-md-5 text-black">
      <div class="h1">Dashboard</div>
    </div>

    <div class="col-md-5">
      <DisplayMessage :message="message" />

      <div class="form-check form-switch" id="switchButton">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          @click="formVisibility = !formVisibility"
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
            ></textarea>
          </div>

          <div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <Notes />
</template>

<script>
import { ref, watch } from '@vue/runtime-core';

import { useState, useActions } from '../helpers';
import useDisplayMessage from '../composables/useDisplayMessage';
import schemas from '../config/schemas';

import DisplayMessage from '../components/DisplayMessage.vue';
import Notes from '../components/Notes.vue';
import { useStore } from 'vuex';

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
    const insertNoteStore = (payload) =>
      store.dispatch('notes/insertNote', payload);

    // refs | local state
    const newNote = ref({
      title: '',
      note: '',
    });

    const formVisibility = ref(false);

    // functions
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
        setDisplayMessage(error.message, msgTypes.error);
        return false;
      }
    };

    const insertNote = async () => {
      setDisplayMessage('');

      if (await validNote()) {
        try {
          await insertNoteStore(newNote.value);
          resetForm();
        } catch (error) {
          setDisplayMessage(error.message, msgTypes.error);
        }
      }
    };

    // watch
    watch(newNote.value, () => {
      setDisplayMessage('');
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
