<template>
  <div v-if="message.message" :class="['alert', activeClass]" role="alert">
    {{ message.message }}
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'DisplayMessage',
  props: {
    message: Object,
  },

  setup(props) {
    const activeClass = computed(() =>
      props.message.type ? `alert-${props.message.type}` : 'alert-info'
    );

    return { activeClass };
  },
};
</script>

<style></style>
