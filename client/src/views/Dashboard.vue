<template>
  <div class="row">
    <div class="col-md-5">
      <div class="h1">Dashboard</div>
      <!-- navbar display username -->
      <div class="h5">Welcome, {{ user.username }}</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

const API_URL = 'http://localhost:5000/auth';
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

    // hooks
    onMounted(async () => {
      try {
        const response = await fetch(`${API_URL}/checkuser`, {
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
        console.log(error);
      }
    });

    // functions
    const logout = () => {
      localStorage.removeItem('token');
      router.push({ path: 'login' });
    };
    // watch
    // expose
    return { user };
  },
};
</script>

<style></style>
