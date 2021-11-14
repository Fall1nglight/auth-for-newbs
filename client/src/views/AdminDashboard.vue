<template>
  <div class="h3">Admin Dashboard</div>

  <stats></stats>
  <edit-user></edit-user>
</template>

<script>
import Stats from '../components/Stats.vue';
import EditUser from '../components/EditUser.vue';
export default {
  name: 'AdminDashboard',
  components: {
    Stats,
    EditUser,
  },
};
</script>

<style></style>
