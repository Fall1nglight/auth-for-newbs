<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Auth for Newbs</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Homepage </router-link>
          </li>

          <li v-if="displayNavItems" class="nav-item">
            <router-link to="/signup" class="nav-link">Signup</router-link>
          </li>

          <li v-if="displayNavItems" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>

          <li v-if="!displayNavItems" class="nav-item">
            <router-link to="/dashboard" class="nav-link"
              >Dashboard</router-link
            >
          </li>

          <li v-if="!displayNavItems" class="nav-item">
            <router-link to="/logout" class="nav-link">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

const protectedRoutes = ['/', '/login', '/signup'];

export default {
  name: 'Navbar',

  setup() {
    //route
    const route = useRoute();

    // ref
    const displayNavItems = ref(true);

    // watch
    watch(route, () => {
      // if we are on the homepage and the user has auth-token
      if (route.path === '/' && localStorage.token)
        return (displayNavItems.value = false);

      // if we are on one of the protected routes
      if (protectedRoutes.includes(route.path))
        return (displayNavItems.value = true);

      // if we are not on a protected route
      displayNavItems.value = false;
    });

    return { displayNavItems };
  },
};
</script>

<style></style>
