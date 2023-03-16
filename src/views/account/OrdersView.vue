<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { DateTime } from 'luxon';

import * as api from '@/api';
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import PageSpinner from '@/components/spinner/PageSpinner.vue';
import { useAuthStore } from '@/stores/auth';
import AccountTabs from '@/views/account/AccountTabs.vue';
import OrderDetail from '@/views/account/OrderDetail.vue'

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const loading = ref(true);
const orders = ref([]);
api.getOrders(token.value)
  .then((res) => {
    orders.value = res;
    loading.value = false;
  });
</script>

<template>
  <div id="user-orders">
    <AccountTabs selected="orders" />

    <div class="row d-flex justify-content-center align-items-center mt-3">
      <PageSpinner v-if="loading" />
      <div
        v-if="!loading"
        class="row mb-3"
      >
        <div class="container table-responsive">
          <table class="table table-hover accordion">
            <thead>
              <tr>
                <th></th>
                <th scope="col">Order Number</th>
                <th scope="col">Date</th>
                <th
                  scope="col"
                  class="text-end"
                >Products</th>
                <th
                  scope="col"
                  class="text-end"
                >Order Total</th>
              </tr>
            </thead>
            <tbody id="orderTable">
              <template v-for="order in orders">
                <tr
                  data-bs-toggle="collapse"
                  :id="`row-${order.number}`"
                  :data-bs-target="`#detail-${order.number}`"
                >
                  <td style="width: 64px;">
                    <button class="btn btn-link btn-sm">
                      <IconChevronDown />
                    </button>
                  </td>
                  <th scope="row">{{ order.number }}</th>
                  <td>{{ DateTime.fromISO(order.date).toLocaleString(DateTime.DATETIME_SHORT) }}</td>
                  <td class="text-end">{{ order.orderLines.length }}</td>
                  <td class="text-end">{{ order.total }}</td>
                </tr>
                <tr
                  class="collapse accordion-collapse"
                  :id="`detail-${order.number}`"
                >
                  <td colspan="5">
                    <OrderDetail :order="order" />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>