<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import * as api from '@/api';
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import IconTrash from '@/components/icons/IconTrash.vue';
import PageControl from '@/components/pagination/PageControl.vue';
import PageSpinner from '@/components/spinner/PageSpinner.vue';
import { useAuthStore } from '@/stores/auth';
import AdminTabs from '@/views/admin/AdminTabs.vue';

const route = useRoute();
const pageNum = parseInt(route.query.page) || 1;
const pageSize = parseInt(route.query.size) || 10;

let count = 0;

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const loading = ref(true);
const page = ref(null);
getUsers();

function getUsers() {
  api.getUsers(token.value, pageNum, pageSize)
    .then((data) => {
      page.value = data;
      loading.value = false;
    });
}

async function deleteUser(user) {
  api.deleteUser(token.value, user.email)
    .then(() => {
      getUsers();
    });
}
</script>

<template>
  <div id="admin-users">
    <AdminTabs selected="users" />

    <div class="row d-flex justify-content-center align-items-center mt-3">
      <PageSpinner v-if="loading" />
      <div
        v-if="!loading"
        class="row"
      >
        <PageControl
          v-if="page"
          :page="pageNum"
          :size="pageSize"
          :pages="Math.ceil(page.total / page.size)"
          :link="'admin/users'"
        />
        <div class="container table-responsive">
          <table class="table table-hover accordion">
            <thead>
              <tr>
                <th></th>
                <th scope="col">Email</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th
                  scope="col"
                  class="text-center"
                >Action</th>
              </tr>
            </thead>
            <tbody id="orderTable">
              <template v-for="user in page.users">
                <tr :id="`row-${++count}`">
                  <td
                    style="width: 64px;"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#detail-${count}`"
                  >
                    <button class="btn btn-link btn-sm">
                      <IconChevronDown />
                    </button>
                  </td>
                  <th scope="row">{{ user.email }}</th>
                  <td>{{ user.first_name }}</td>
                  <td>{{ user.last_name }}</td>
                  <td class="text-center">
                    <a
                      href="#"
                      class="link-dark"
                      @click="deleteUser(user)"
                    >
                      <IconTrash />
                    </a>
                  </td>
                </tr>
                <tr
                  class="collapse accordion-collapse"
                  :id="`detail-${count}`"
                >
                  <td colspan="5">
                    <div class="row mx-5">
                      <div class="col">
                        <div class="row">
                          <div class="col-lg-2"><strong>Name: </strong></div>
                          <div class="col">{{ user.first_name }} {{ user.last_name }}</div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="row">
                          <div class="col-lg-2"><strong>Address: </strong></div>
                          <div class="col">{{ user.address }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="row mx-5">
                      <div class="col">
                        <div class="row">
                          <div class="col-lg-2"><strong>Email: </strong></div>
                          <div class="col">{{ user.email }}</div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="row">
                          <div class="col-lg-2"><strong>City: </strong></div>
                          <div class="col">{{ user.city }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="row mx-5">
                      <div class="col">
                        <div class="row">
                          <div class="col-lg-2"><strong>Phone: </strong></div>
                          <div class="col">{{ user.phone }}</div>
                        </div>
                      </div>
                      <div class="col">
                        <div class="row">
                          <div class="col-lg-2"><strong>Country: </strong></div>
                          <div class="col">{{ user.country }}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <PageControl
          v-if="page"
          :page="pageNum"
          :size="pageSize"
          :pages="Math.ceil(page.total / page.size)"
          :link="'admin/users'"
        />
      </div>
    </div>
  </div>
</template>
