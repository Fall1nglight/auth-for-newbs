<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">AX Notes</a>
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

      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarColor01"
      >
        <ul class="navbar-nav me-5">
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

          <li v-show="user._id" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ user.username }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-show="isAdmin">
                <router-link to="/admin-dashboard" class="dropdown-item">
                  Admin Dashboard
                </router-link>
              </li>
              <li>
                <router-link to="/logout" class="dropdown-item"
                  >Logout</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import { Types } from '../store/types';
import { auth } from '../store/types/namespaces';

const protectedRoutes = ['/', '/login', '/signup'];

// todo | refactor this mess

export default {
  name: 'Navbar',

  setup() {
    // store
    const store = useStore();

    // vuex
    const user = computed(
      () => store.getters[`${auth}${Types.getters.GET_USER}`]
    );
    const isAdmin = computed(
      () => store.getters[`${auth}${Types.getters.IS_ADMIN}`]
    );

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

    return { displayNavItems, user, isAdmin };
  },
};
</script>

<style></style>
