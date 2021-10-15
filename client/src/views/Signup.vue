<template>
  // Todo: Áznézni a row cuccot form-on bellül
  <form class="row g-3">
    <div class="col-md-8">
      <label for="inputEmail" class="form-label">Username</label>
      <input
        type="text"
        class="form-control"
        placeholder="Please enter your username."
        aria-placeholder="Please enter your username."
        id="inputEmail"
      />
    </div>

    <div class="col-md-4 mb-3 mb-md-0">
      <label for="inputPassword" class="form-label">Password</label>
      <input
        type="text"
        class="form-control"
        placeholder="Please enter your password."
        aria-placeholder="Please enter your password."
        id="inputPassword"
      />
    </div>
    <div class="col-md-4">
      <label for="inputRePassword" class="form-label">Password again</label>
      <input
        type="text"
        class="form-control"
        placeholder="Please enter your password again."
        aria-placeholder="Please enter your password again."
        id="inputRePassword"
      />
    </div>
  </form>
</template>

<script>
// Todo: CSS background állítása, felfelé
export default {
  name: 'Signup',
};
</script>

<style></style>
