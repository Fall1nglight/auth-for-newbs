<template>
  <form @submit.prevent="signup">
    <div class="h1 mb-5 text-md-center">Signup</div>

    <div class="row justify-content-md-center">
      <div class="col-md-8">
        <DisplayMessage v-if="errorMessage" :message="errorMessage" />
      </div>
    </div>

    <div class="row mb-3 justify-content-md-center">
      <div class="col-md-8">
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

    <!-- required -> input fields -->

    <div class="row mb-3 justify-content-md-center">
      <div class="col-md-4 mb-3 mb-md-0">
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

      <div class="col-md-4">
        <label for="inputConfirmPassword" class="form-label"
          >Confirm Password</label
        >
        <input
          v-model="user.confirmPassword"
          type="password"
          class="form-control"
          placeholder="Please confirm your password."
          aria-placeholder="Please confirm your password."
          autocomplete="new-password"
          id="inputConfirmPassword"
          required
        />
      </div>
    </div>

    <div class="row justify-content-md-center">
      <div class="col-md-8 text-center text-md-start">
        <button type="submit" class="btn btn-primary">Signup</button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';
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

  confirmPassword: Joi.string()
    .regex(/^\S+$/)
    .min(10)
    .max(30)
    .required(),
});

const API_URl = 'http://localhost:5000/auth/signup';

export default {
  name: 'Signup',
  components: {
    DisplayMessage,
  },

  setup() {
    // refs
    const user = ref({
      username: '',
      password: '',
      confirmPassword: '',
    });

    const errorMessage = ref('');

    // watch
    watch(user.value, () => {
      errorMessage.value = '';
    });

    // functions
    const setErrorMessage = (message) => {
      errorMessage.value = message;
    };

    const signup = async () => {
      errorMessage.value = '';

      if (await validUser()) {
        // send data to the server

        const body = {
          username: user.value.username,
          password: user.value.password,
        };

        try {
          const response = await fetch(API_URl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-type': 'application/json',
            },
          });

          const result = await response.json();
          if (!response.ok) throw new Error(result.message);
          console.log(result);
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    };

    const validUser = async () => {
      if (user.value.password !== user.value.confirmPassword) {
        setErrorMessage('Passwords must match.');
        return false;
      }

      try {
        await schema.validateAsync(user.value);
        return true;
      } catch (error) {
        if (error.message.includes('username')) {
          setErrorMessage('Username is invalid.');
        } else {
          setErrorMessage('Password is invalid.');
        }
        return false;
      }
    };

    return { user, errorMessage, signup };
  },
};
</script>

<style></style>
