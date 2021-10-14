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
            <router-link to="/" class="nav-link active"
              >Főoldal
              <span class="visually-hidden">(jelenlegi)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/signup" class="nav-link"
              >Regisztráció</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link"
              >Bejelentkezés</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style></style>
