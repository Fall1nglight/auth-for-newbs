<template>
  <form @submit.prevent="signup">
    <div class="h1 mb-5 text-center">Signup</div>

    <div class="row justify-content-md-center">
      <div class="col-md-10 col-lg-6">
        <DisplayMessage :message="message" />
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
import { watch, ref, computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { passwordStrength } from 'check-password-strength';

import { Types } from '../store/types';
import { auth } from '../store/types/namespaces';
import useDisplayMessage from '../composables/useDisplayMessage';
import schemas from '../config/schemas';

import DisplayMessage from '../components/DisplayMessage.vue';

export default {
  name: 'Signup',
  components: {
    DisplayMessage,
  },

  setup() {
    // composables
    const { msgTypes, message, setDisplayMessage } = useDisplayMessage();

    // schemas
    const { signup: schema } = schemas.auth;

    // store
    const store = useStore();

    // vuex
    const errorMessage = computed(
      () => store.getters[`${auth}${Types.getters.GET_ERROR_MESSAGE}`]
    );

    const signupAction = (payload) =>
      store.dispatch(`${auth}${Types.actions.SIGNUP}`, payload);

    const setErrorMessage = (message) =>
      store.commit(`${auth}${Types.mutations.SET_ERROR_MESSAGE}`, message);

    // router
    const router = useRouter();

    // refs
    const user = ref({
      username: '',
      password: '',
      confirmPassword: '',
    });

    // functions
    const resetErrorMessage = () => {
      if (errorMessage.value) setErrorMessage('');
    };

    const signup = async () => {
      resetErrorMessage();

      if (!(await validUser())) return;
      await signupAction(user.value);

      if (errorMessage.value) return;
      router.push({ path: '/dashboard' });
    };

    const validUser = async () => {
      try {
        await schema.validateAsync(user.value);

        return true;
      } catch (error) {
        if (error.message.includes('username')) {
          setErrorMessage('Username is invalid.');
        } else if (error.message.includes('"Confirm Password"')) {
          setErrorMessage('Confirm password must match');
        } else {
          setErrorMessage('Password is invalid');
        }
        return false;
      }
    };

    //computed
    const pwdStrength = computed(() =>
      user.value.password ? passwordStrength(user.value.password).value : ''
    );

    // watch
    watch(user.value, () => {
      resetErrorMessage();
    });

    watch(errorMessage, () => {
      setDisplayMessage(errorMessage.value, msgTypes.error);
    });

    // expose
    return { user, signup, message, pwdStrength };
  },
};
</script>

<style></style>
