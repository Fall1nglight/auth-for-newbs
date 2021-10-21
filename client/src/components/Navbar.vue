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

const whitelistedRoutes = ['/', '/signup', '/login'];

export default {
  name: 'Navbar',

  setup() {
    //route
    const route = useRoute();

    // ref
    const displayNavItems = ref(true);

    // watch
    watch(route, () => {
      // return if we are on the logout page
      if (route.path === '/logout') return;

      // hide nav items when we are on a whitelistedRoute or the user has a stored token
      if (whitelistedRoutes.includes(route.path)) {
        displayNavItems.value = true;
      } else {
        displayNavItems.value = false;
      }

      if (route.path === '/' && localStorage.token)
        return (displayNavItems.value = false);
    });

    return { displayNavItems };
  },
};
</script>

<style></style>
