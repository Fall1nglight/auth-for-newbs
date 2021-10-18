<template>
  <div class="row justify-content-center">
    <div class="col-md-5 me-auto">
      <div class="h1">Dashboard</div>
      <!-- navbar display username -->
      <div class="h5">Welcome, {{ user.username }}</div>
    </div>

    <div class="col-md-8">
      <form @submit.prevent="insertNote"></form>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
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
    return { user };
  },
};
</script>

<style></style>
