<template>
  <div class="alert alert-danger" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'DisplayMessage',
  props: {
    message: String,
  },
};
</script>

<style></style>
