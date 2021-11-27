<template>
  <div class="row pt-5 justify-content-center">
    <div class="col-md-5">
      <div class="h3">Edit User</div>
      <display-message :message="message"></display-message>

      <!-- Searching user -->
      <div class="input-group mb-3">
        <span class="input-group-text"><i class="bi bi-search"></i></span>

        <input
          v-model="searchInput"
          type="text"
          list="ShowDataList"
          id="inputSearch"
          class="form-control"
          autocomplete="off"
          placeholder="Search user by username."
          aria-placeholder="Search user by username."
        />

        <datalist id="ShowDataList">
          <option
            v-for="user in users"
            :key="user._id"
            :value="user.username"
          ></option>
        </datalist>
      </div>

      <!-- Editing user -->
      <form @submit.prevent="editUser">
        <!-- username -->
        <div class="mb-3">
          <label for="inputUsername" class="form-label">Updated Username</label>
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            id="inputUsername"
            placeholder="Enter the updated username."
            aria-placeholder="Enter the updated username."
            autocomplete="off"
          />
        </div>

        <!-- password -->
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Updated Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Enter the updated password."
            aria-placeholder="Enter the updated password."
            autocomplete="new-password"
          />
        </div>

        <!-- role -->
        <div class="mb-3 d-flex justify-content-center">
          <div class="me-5">
            <label class="form-check-label">Role</label>

            <div class="form-check">
              <input
                :checked="user.role === 'user'"
                v-model="user.role"
                value="user"
                class="form-check-input"
                type="radio"
                id="radioRoleUser"
              />
              <label class="form-check-label" for="radioRoleUser">
                User
              </label>
            </div>

            <div class="form-check">
              <input
                :checked="user.role === 'admin'"
                v-model="user.role"
                value="admin"
                class="form-check-input"
                type="radio"
                id="radioRoleAdmin"
              />
              <label class="form-check-label" for="radioRoleAdmin">
                Admin
              </label>
            </div>
          </div>

          <!-- Active -->
          <div>
            <label class="form-check-label">Status</label>

            <div class="form-check">
              <input
                v-model="user.active"
                :checked="user._id.length && user.active"
                :value="true"
                class="form-check-input"
                type="radio"
                id="radioActiveTrue"
              />
              <label class="form-check-label" for="radioActiveTrue">
                Active
              </label>
            </div>

            <div class="form-check">
              <input
                v-model="user.active"
                :checked="user._id.length && !user.active"
                :value="false"
                class="form-check-input"
                type="radio"
                id="radioRoleInactive"
              />
              <label class="form-check-label" for="radioRoleInactive">
                Inactive
              </label>
            </div>
          </div>
        </div>

        <!-- Sumbit -->
        <div class="text-center">
          <button type="submit" class="btn btn-primary">
            Update user
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

import { Types } from '../store/types';
import { admin } from '../store/types/namespaces';

import useDisplayMessage from '../composables/useDisplayMessage';
import schemas from '../config/schemas';

import DisplayMessage from '../components/DisplayMessage.vue';

export default {
  name: 'EditUser',
  components: {
    DisplayMessage,
  },

  setup() {
    // composables
    const { msgTypes, message, setDisplayMessage } = useDisplayMessage();

    // schemas
    const { update: schema } = schemas.admin;

    // store
    const store = useStore();

    // vuex
    const users = computed(
      () => store.getters[`${admin}${Types.getters.GET_USERS}`]
    );

    const adminErrorMessage = computed(
      () => store.getters[`${admin}${Types.getters.GET_ERROR_MESSAGE}`]
    );

    const getUserByName = (username) =>
      computed(() =>
        store.getters[`${admin}${Types.getters.GET_USER_BY_NAME}`](username)
      );

    const updateUser = (payload) =>
      store.dispatch(`${admin}${Types.actions.UPDATE_USER}`, payload);

    // refs
    const user = ref({
      _id: '',
      username: '',
      password: '',
      active: '',
      role: '',
    });

    const searchInput = ref('');

    // functions
    const setUser = (
      id = '',
      username = '',
      password = '',
      active = '',
      role = ''
    ) => {
      user.value._id = id;
      user.value.username = username;
      user.value.password = password;
      user.value.active = active;
      user.value.role = role;
    };

    const clearUser = () => setUser();

    const validateSearch = async (username) => {
      try {
        await schema.validateAsync({ username });

        return true;
      } catch (error) {
        setDisplayMessage(error.message, msgTypes.error);
        return false;
      }
    };

    const validateEdit = async (user) => {
      try {
        await schema.validateAsync(user);
        return true;
      } catch (error) {
        setDisplayMessage(error.message, msgTypes.error);
        return false;
      }
    };

    const editUser = async () => {
      const modifiedUser = { ...user.value };

      // extract id for later usage
      const {
        value: { _id: id },
      } = user;

      // delete properties to pass the validation
      if (!modifiedUser.password) delete modifiedUser.password;
      delete modifiedUser._id;

      if (!(await validateEdit(modifiedUser))) return;

      await updateUser({ modifiedUser, id });

      searchInput.value = '';

      if (adminErrorMessage.value) return;

      setDisplayMessage(
        'User has been successfully updated!',
        msgTypes.success
      );
    };

    // watch
    watch(searchInput, async () => {
      clearUser();

      if (searchInput.value.length < 2) return;

      if (!(await validateSearch(searchInput.value))) return;

      const [searchResult] = getUserByName(searchInput.value).value;

      if (!searchResult)
        return setDisplayMessage(
          'Could not find user with the given username.',
          msgTypes.error
        );

      setDisplayMessage();

      const { _id: id, username, active, role } = searchResult;

      setUser(id, username, '', active, role);
    });

    // expose
    return {
      users,
      user,
      searchInput,
      message,
      editUser,
    };
  },
};
</script>

<style></style>
