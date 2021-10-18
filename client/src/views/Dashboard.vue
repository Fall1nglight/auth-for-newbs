<template>
  <div class="row mb-3">
    <div class="col-md-5 me-auto">
      <div class="h1">Dashboard</div>
      <div class="h5">Welcome, {{ user.username }}</div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-5">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          @click="toggleform = !toggleform"
        />
        <label class="form-check-label text-black" for="flexSwitchCheckDefault"
          >Toggle form</label
        >
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
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

  setup() {
    // router
    const router = useRouter();

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

    const toggleForm = ref(false);

    const errorMessage = ref('');

    // hooks
    onMounted(async () => {
      try {
        const response = await fetch(`${API_URL}/auth/checkuser`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        if (!result.user) return logout();

        // todo: refactor this
        user.value._id = result.user._id;
        user.value.exp = result.user.exp;
        user.value.iat = result.user.iat;
        user.value.username = result.user.username;
      } catch (error) {
        setErrorMessage(error.message);
      }
    });

    // functions
    const setErrorMessage = (message) => {
      errorMessage.value = message;
    };

    const logout = () => {
      localStorage.removeItem('token');
      router.push({ path: 'login' });
    };

    // todo: make a toggleForm fucntion

    const insertNote = async () => {
      if (await validNote()) {
        // insert note to the db

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

        console.log(result);
      }
    };

    const validNote = async () => {
      try {
        await schema.validateAsync();
        return true;
      } catch (error) {
        setErrorMessage(error.message);
        return false;
      }
    };

    // watch
    // expose
    return { user, toggleForm };
  },
};
</script>

<style></style>
