<template>
  <form @submit.prevent="signup">
    <div class="h1 mb-5 text-center">Signup</div>

    <div class="row justify-content-md-center">
      <div class="col-md-10 col-lg-6">
        <DisplayMessage :messageObj="displayMsg" />
      </div>
    </div>

    <div class="row mb-3 justify-content-md-center">
      <div class="col-md-10 col-lg-6">
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
      <div class="col-md-5 col-lg-3 mb-3 mb-md-0">
        <label for="inputPassword" class="form-label">Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control mb-1"
          placeholder="Please enter your password."
          aria-placeholder="Please enter your password."
          autocomplete="new-password"
          id="inputPassword"
          required
        />
        <small :class="['text-mute', pwdStrength ? '' : 'invisible']"
          >Password strength: {{ pwdStrength }}</small
        >
      </div>

      <div class="col-md-5 col-lg-3">
        <label for="inputConfirmPassword" class="form-label"
          >Confirm Password</label
        >
        <input
          v-model="user.confirmPassword"
          type="password"
          class="form-control mb-1"
          placeholder="Please confirm your password."
          aria-placeholder="Please confirm your password."
          autocomplete="new-password"
          id="inputConfirmPassword"
          required
        />
      </div>
    </div>

    <div class="row justify-content-md-center">
      <div class="col-md-10 col-lg-6 text-center text-md-start">
        <button type="submit" class="btn btn-primary">Signup</button>
      </div>
    </div>
  </form>
</template>

<script>
import { inject, watch, ref, computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

import Joi from 'joi';
import { passwordStrength } from 'check-password-strength';
import { useGetters, useActions } from '../helpers';

import DisplayMessage from '../components/DisplayMessage.vue';
import { useStore } from 'vuex';

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
    //vuex items
    const { signup: storeSignup } = useActions(['signup']);
    const { getAuthToken: authToken, isLoggedIn } = useGetters([
      'getAuthToken',
      'isLoggedIn',
    ]);

    // router
    const router = useRouter();

    //inject
    const msgTypes = inject('bootstrapTypes');

    // refs
    const user = ref({
      username: '',
      password: '',
      confirmPassword: '',
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

    const signup = async () => {
      setDisplayMessage('');

      if (await validUser()) {
        try {
          // commit action to vuex store
          storeSignup(user.value);
          router.push({ path: 'dashboard' });
        } catch (error) {
          setDisplayMessage(error.message, msgTypes.error);
        }
      }
    };

    const validUser = async () => {
      try {
        await schema.validateAsync(user.value);

        // todo | do this with Joi
        if (user.value.password !== user.value.confirmPassword) {
          setDisplayMessage('Passwords must match.', msgTypes.error);
          return false;
        }

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

    //computed
    const pwdStrength = computed(() =>
      user.value.password ? passwordStrength(user.value.password).value : ''
    );

    // expose
    return { user, signup, displayMsg, pwdStrength };
  },
};
</script>

<style></style>
