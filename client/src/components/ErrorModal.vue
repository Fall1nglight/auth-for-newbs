<template>
  <div
    class="modal fade"
    id="errorModal"
    tabindex="-1"
    aria-labelledby="errorModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="errorModalLabel">Error</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ statErrorMessage || adminErrorMessage }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

import { admin, statistics } from '../store/types/namespaces';
import { Types } from '../store/types';

export default {
  name: 'Modal',

  setup() {
    // store
    const store = useStore();

    // vuex items
    const statErrorMessage = computed(
      () => store.getters[`${statistics}${Types.getters.GET_ERROR_MESSAGE}`]
    );

    const adminErrorMessage = computed(
      () => store.getters[`${admin}${Types.getters.GET_ERROR_MESSAGE}`]
    );

    const setStatErrorMessage = (message) =>
      store.commit(
        `${statistics}${Types.mutations.SET_ERROR_MESSAGE}`,
        message
      );

    const setAdminErrorMessage = (message) =>
      store.commit(`${admin}${Types.mutations.SET_ERROR_MESSAGE}`, message);

    const resetAllErrorMessages = () => {
      if (statErrorMessage.value) setStatErrorMessage('');
      if (adminErrorMessage.value) setAdminErrorMessage('');
    };

    // watch
    watch(statErrorMessage, () => {
      if (!statErrorMessage.value) return;

      const modalEl = document.getElementById('errorModal');
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

      modal.toggle();
    });

    watch(adminErrorMessage, () => {
      if (!adminErrorMessage.value) return;

      console.log('asd');

      const modalEl = document.getElementById('errorModal');
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

      modal.toggle();
    });

    // bootstrap stuff
    onMounted(() => {
      const modalEl = document.getElementById('errorModal');
      modalEl.addEventListener('hidden.bs.modal', () =>
        resetAllErrorMessages()
      );
    });

    // expose
    return { statErrorMessage, adminErrorMessage };
  },
};
</script>

<style></style>
