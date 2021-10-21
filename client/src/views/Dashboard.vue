<template>
  <div class="row mb-3 justify-content-evenly">
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

      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          @click="toggleForm"
        />
        <label class="form-check-label text-black" for="flexSwitchCheckDefault"
          >Toggle form</label
        >
      </div>

      <!-- this will be a problem on small devices -->

      <div class="mt-3" :class="{ invisible: !formVisibility }">
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
</template>

<script>
import { inject, onMounted, ref, watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

import DisplayMessage from '../components/DisplayMessage';

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
  },

  setup() {
    // router
    const router = useRouter();

    // inject
    const msgTypes = inject('msgTypes');

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

    const formVisibility = ref(false);

    const displayMsg = ref({
      message: '',
      type: '',
    });

    const notes = ref([]);

    // hooks
    onMounted(async () => {
      await validateUser();
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

    const toggleForm = () => {
      formVisibility.value = !formVisibility.value;
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
        if (!result.user) return logout();

        // * set values 'manually' so we get corrections
        // todo: refactor this

        user.value._id = result.user._id;
        user.value.exp = result.user.exp;
        user.value.iat = result.user.iat;
        user.value.username = result.user.username;
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

          if (!result.newNote)
            return setDisplayMessage('Note was not saved. (Backend error)');

          newNote.value.title = '';
          newNote.value.note = '';
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

    const getNotes = async () => {
      try {
        const response = await fetch();
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
      toggleForm,
      insertNote,
      getNotes,
    };
  },
};
</script>

<style></style>
