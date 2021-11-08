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
import { useActions, useGetters, useMutations, useState } from '../helpers';
import Joi from 'joi';

import DisplayMessage from '../components/DisplayMessage.vue';

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
    // vuex items
    const { errorMessage } = useState('auth', ['errorMessage']);
    const { login: loginStore } = useActions(['login']);
    const { setErrorMessage } = useMutations(['setErrorMessage']);

    // router
    const router = useRouter();

    // inject
    const msgTypes = inject('bootstrapTypes');

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
      setErrorMessage('');
      setDisplayMessage('');

      if (await validUser()) {
        try {
          await loginStore(user.value);

          if (errorMessage.value) return;

          router.push({ path: '/dashboard' });
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
      setErrorMessage('');
    });

    watch(errorMessage, () => {
      setDisplayMessage(errorMessage.value, msgTypes.error);
    });

    // expose
    return { user, login, displayMsg };
  },
};
</script>

<style></style>
