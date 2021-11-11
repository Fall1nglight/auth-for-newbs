<template>
  <form @submit.prevent="login">
    <div class="h1 mb-5 text-center">Login</div>

    <div class="row justify-content-md-center">
      <div class="col-md-5">
        <DisplayMessage :message="message" />
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
import { watch, ref, computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import useDisplayMessage from '../composables/useDisplayMessage';
import schemas from '../config/schemas';

import DisplayMessage from '../components/DisplayMessage.vue';

export default {
  name: 'Login',
  components: {
    DisplayMessage,
  },

  setup() {
    // composables
    const { msgTypes, message, setDisplayMessage } = useDisplayMessage();

    // schemas
    const { login: schema } = schemas.auth;

    // store
    const store = useStore();

    // vuex items
    const errorMessage = computed(() => store.getters['auth/errorMessage']);
    const loginAction = (payload) => store.dispatch('auth/login', payload);
    const setErrorMessage = (message) =>
      store.commit('auth/setErrorMessage', message);

    // router
    const router = useRouter();

    // refs
    const user = ref({
      username: '',
      password: '',
    });

    // functions
    const login = async () => {
      setErrorMessage('');
      setDisplayMessage('');

      if (await validUser()) {
        try {
          await loginAction(user.value);

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
    return { user, login, message };
  },
};
</script>

<style></style>
