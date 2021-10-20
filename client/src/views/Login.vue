<template>
  <form @submit.prevent="login">
    <div class="h1 mb-5 text-center">Login</div>

    <div class="row justify-content-md-center">
      <div class="col-md-5">
        <DisplayMessage :messageObj="displayMsg" />
      </div>
    </div>

    <div class="row mb-3 justify-content-md-center">
      <div class="col-md-5">
        <label for="inputEmail" class="form-label">Username</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          placeholder="Please enter your username."
          aria-placeholder="Please enter your username."
          autocomplete="username"
          id="inputEmail"
          required
        />
      </div>
    </div>

    <div class="row mb-3 justify-content-md-center">
      <div class="col-md-5 mb-3 mb-md-0">
        <label for="inputPassword" class="form-label">Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Please enter your password."
          aria-placeholder="Please enter your password."
          autocomplete="new-password"
          id="inputPassword"
          required
        />
      </div>
    </div>

    <div class="row justify-content-md-center">
      <div class="col-md-5 text-center text-md-start">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </div>
  </form>
</template>

<script>
import { inject, watch, ref } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import Joi from 'joi';

import DisplayMessage from '../components/DisplayMessage';

const schema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),

  password: Joi.string()
    .regex(/^\S+$/)
    .min(10)
    .max(30)
    .required(),
});

const API_URl = 'http://localhost:5000/auth/login';

export default {
  name: 'Login',
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
      username: '',
      password: '',
    });

    const displayMsg = ref({
      message: '',
      type: '',
    });

    // functions
    const setDisplayMessage = (msg, msgType) => {
      displayMsg.value.message = msg;
      displayMsg.value.type = msgType || '';
    };

    const login = async () => {
      setDisplayMessage('');

      if (await validUser()) {
        try {
          const response = await fetch(API_URl, {
            method: 'POST',
            body: JSON.stringify({
              username: user.value.username,
              password: user.value.password,
            }),
            headers: {
              'Content-type': 'application/json',
            },
          });

          const result = await response.json();
          if (!response.ok) throw new Error(result.message);

          localStorage.token = result.token;
          router.push({ path: 'dashboard' });
        } catch (error) {
          setDisplayMessage(error.message, msgTypes.error);
        }
      }
    };

    const validUser = async () => {
      try {
        await schema.validateAsync(user.value);
        return true;
      } catch (error) {
        if (error.message.includes('username')) {
          setDisplayMessage('Username is invalid.', msgTypes.error);
        } else {
          setDisplayMessage('Password is invalid.', msgTypes.error);
        }
        return false;
      }
    };

    // watch
    watch(user.value, () => {
      setDisplayMessage('');
    });

    // expose
    return { user, login, displayMsg };
  },
};
</script>

<style></style>
