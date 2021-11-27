<template>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <public-note
      v-for="note in publicNotes"
      :note="note"
      :key="note._id"
    ></public-note>
  </div>

  <div class="h1 text-center mt-5" v-if="!publicNotes.length">
    Whoops, there are not any public notes here...
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { Types } from '../store/types';
import { pub } from '../store/types/namespaces';

import PublicNote from '../components/PublicNote.vue';

export default {
  name: 'PublicNotes',
  components: {
    PublicNote,
  },

  setup() {
    // store
    const store = useStore();

    // vuex
    const publicNotes = computed(
      () => store.getters[`${pub}${Types.getters.GET_NOTES}`]
    );

    // expose
    return {
      publicNotes,
    };
  },
};
</script>

<style></style>
