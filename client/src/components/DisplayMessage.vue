<template>
  <div v-if="message" :class="['alert', activeClass]" role="alert">
    {{ message }}
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';

export default {
  name: 'DisplayMessage',
  props: {
    message: String,
    type: String,
  },

  setup(props) {
    const activeClass = computed(() =>
      props.type ? `alert-${props.type}` : 'alert-info'
    );

    return { activeClass };
  },
};
</script>

<style></style>
