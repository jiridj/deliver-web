<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import PageSpinner from '@/components/spinner/PageSpinner.vue';
import AccountTabs from '@/views/account/AccountTabs.vue';

import * as api from '@/api';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const updates = ref(false);
let editable;

const loading = ref(true);
const user = ref(null);
api.getUser(token.value).then((res) => {
  user.value = res;
  loading.value = false;

  editable = createCopy(res);
});

function createCopy(user) {
  return ref({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    address: user.address,
    city: user.city,
    country: user.country,
    phone: user.phone,
    credit_card: user.credit_card
  });
}

async function deleteAccount() {
  const ok = await api.deleteAccount(token.value, user.value.email);
  if (ok) logout();
}

async function update() {
  const updated = await api.updateUser(token.value, editable.value);
  authStore.updateUser(updated);
  updates.value = false;
}

function cancel() {
  editable = createCopy(user.value);
  updates.value = false;
}

function logout() {
  authStore.logout();
}

function onChange() {
  updates.value = true;
}
</script>

<template>
  <div id="user-profile">
    <AccountTabs selected="profile" />

    <div class="row d-flex justify-content-center align-items-center mx-1">
      <form @input="onChange">
        <div class="row mb-3 pt-3">
          <div class="col">
            <h3>User profile</h3>
          </div>
          <div class="col d-flex align-items-end justify-content-end">
            <button type="button" class="btn btn-success" :disabled="!updates" @click="update">
              Update
            </button>
            <button
              type="button"
              class="btn btn-warning"
              :disabled="!updates"
              style="margin-left: 8px"
              @click="cancel"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-danger" style="margin-left: 8px" @click="logout">
              Logout
            </button>
          </div>
        </div>
        <PageSpinner v-if="loading" />
        <div v-if="!loading">
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" disabled v-model="editable.email" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">First name</label>
              <input
                type="text"
                class="form-control"
                v-model="editable.first_name"
                placeholder="First name"
                aria-label="First name"
              />
            </div>
            <div class="col">
              <label class="form-label">Last name</label>
              <input
                type="text"
                class="form-control"
                v-model="editable.last_name"
                placeholder="Last name"
                aria-label="Last name"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                v-model="editable.address"
                placeholder="Address"
                aria-label="Address"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">City</label>
              <input
                type="text"
                class="form-control"
                v-model="editable.city"
                placeholder="City"
                aria-label="City"
              />
            </div>
            <div class="col">
              <label class="form-label">Country</label>
              <input
                type="text"
                class="form-control"
                v-model="editable.country"
                placeholder="Country"
                aria-label="Country"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Phone number</label>
              <input
                type="text"
                class="form-control"
                v-model="editable.phone"
                placeholder="+00 (000) 000-0000"
                aria-label="Phone number"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Credit card</label>
              <input
                type="text"
                class="form-control"
                v-model="editable.credit_card"
                placeholder="Credit card"
                aria-label="Credit card"
              />
            </div>
          </div>
          <div class="row">
            <hr />
          </div>
          <div style="margin-left: -10px">
            <button
              type="button"
              class="btn btn-danger"
              style="margin-left: 8px"
              @click="deleteAccount"
            >
              Delete your account
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
