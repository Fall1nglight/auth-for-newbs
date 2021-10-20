<template>
  <div v-if="messageObj.message" :class="['alert', activeClass]" role="alert">
    {{ messageObj.message }}
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';

export default {
  name: 'DisplayMessage',
  props: {
    messageObj: Object,
  },

  setup(props) {
    const activeClass = computed(() =>
      props.messageObj.type ? `alert-${props.messageObj.type}` : 'alert-info'
    );

    return { activeClass };
  },
};
</script>

<style></style>
