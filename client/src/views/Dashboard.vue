<template>
  <div class="row mb-3 justify-content-between">
    <div class="col-md-5 text-black">
      <div class="h1">Dashboard</div>
      <div class="h5">Welcome, {{ user.username }}</div>

      <figure class="mt-4">
        <blockquote class="blockquote">
          <p>A well-known quote, contained in a blockquote element.</p>
        </blockquote>
        <figcaption class="blockquote-footer text-black">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </figcaption>
      </figure>
    </div>

    <div class="col-md-5">
      <DisplayMessage :messageObj="displayMsg" />

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

  <Notes
    @toggleNoteReminder="toggleNoteReminder"
    @editNote="editNote"
    @deleteNote="deleteNote"
    :notes="notes"
  />
</template>

<script>
import { inject, onMounted, ref, watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

import DisplayMessage from '../components/DisplayMessage.vue';
import Notes from '../components/Notes.vue';

import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(30)
    .required(),

  note: Joi.string()
    .min(2)
    .max(450)
    .required(),
});

const API_URL = 'http://localhost:5000';

export default {
  name: 'Dashboard',
  components: {
    DisplayMessage,
    Notes,
  },

  setup() {
    // router
    const router = useRouter();

    // inject
    const msgTypes = inject('bootstrapTypes');

    // refs
    const user = ref({
      _id: '',
      exp: 0,
      iat: 0,
      username: '',
    });

    const newNote = ref({
      title: '',
      note: '',
    });

    const notes = ref([]);

    const formVisibility = ref(false);

    const displayMsg = ref({
      message: '',
      type: '',
    });

    // hooks
    onMounted(async () => {
      await validateUser();

      if (!user.value._id) return logout();

      await fetchNotes();
    });

    // functions
    const setDisplayMessage = (msg, msgType) => {
      displayMsg.value.message = msg;
      displayMsg.value.type = msgType || '';
    };

    const logout = () => {
      localStorage.removeItem('token');
      router.push({ path: 'login' });
    };

    const validateUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/checkuser`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        if (!result.user) return;

        user.value = result.user;
      } catch (error) {
        setDisplayMessage(error.message, msgTypes.error);
      }
    };

    const insertNote = async () => {
      setDisplayMessage('');

      if (await validNote()) {
        try {
          const response = await fetch(`${API_URL}/api/v1/notes`, {
            method: 'POST',
            body: JSON.stringify(newNote.value),
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${localStorage.token}`,
            },
          });

          const result = await response.json();
          if (!response.ok) throw new Error(result.message);
          if (!result.success)
            throw new Error('Note was not saved. (Backend error)');

          formVisibility.value = false;
          newNote.value.title = '';
          newNote.value.note = '';

          await fetchNotes();
        } catch (error) {
          setDisplayMessage(error.message, msgTypes.error);
        }
      }
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

    const fetchNotes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/notes`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const result = await response.json();
        if (!response.ok || !result.userNotes)
          throw new Error('Could not fetch your notes. (Backend error)');

        // * protect array from duplicates
        notes.value = [];

        result.userNotes.forEach((note) => {
          notes.value.push(note);
        });
      } catch (error) {
        setDisplayMessage(error.message, msgTypes.error);
      }
    };

    const toggleNoteReminder = async (noteToUpdate) => {
      try {
        const { _id: id, reminder } = noteToUpdate;

        const response = await fetch(`${API_URL}/api/v1/notes/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ reminder: !reminder }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        if (!result.success)
          return setDisplayMessage(
            'Failed to update note. Please try again later. (Backend error)'
          );

        await fetchNotes();
      } catch (error) {
        setDisplayMessage(error.message, msgTypes.error);
      }
    };

    const editNote = async (noteToUpdate) => {
      try {
        const { _id: id, title, note } = noteToUpdate;

        const response = await fetch(`${API_URL}/api/v1/notes/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title: title,
            note: note,
          }),
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        if (!result.success)
          throw new Error(
            'Failed to update note. Please try again later. (Backend error)'
          );

        await fetchNotes();
      } catch (error) {
        setDisplayMessage(error.message, msgTypes.error);
      }
    };

    const deleteNote = async (noteToUpdate) => {
      if (!confirm('Are you sure you want to delete this note?')) return;

      try {
        const { _id: id } = noteToUpdate;
        const response = await fetch(`${API_URL}/api/v1/notes/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        if (!result.success)
          throw new Error(
            'Failed to delete note. Please try again later. (Backend error)'
          );

        await fetchNotes();
      } catch (error) {
        setDisplayMessage(error.message, msgTypes.error);
      }
    };

    // watch
    watch(newNote.value, () => {
      setDisplayMessage('');
    });

    // expose
    return {
      user,
      newNote,
      formVisibility,
      notes,
      displayMsg,
      insertNote,
      fetchNotes,
      toggleNoteReminder,
      editNote,
      deleteNote,
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
