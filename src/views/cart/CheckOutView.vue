<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import * as api from '@/api';
import PageSpinner from '@/components/spinner/PageSpinner.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import CheckOutSteps from '@/views/cart/CheckOutSteps.vue';

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const cartStore = useCartStore();
const { orderLines } = storeToRefs(cartStore);

let orderTotal = 0;
orderLines.value.forEach((line) =>
  orderTotal += (line.quantity * line.product.price)
);

const steps = [
  { label: 'Review Cart', active: false, finished: true },
  { label: 'Shipping Details', active: false, finished: true },
  { label: 'Check Out', active: true, finished: false },
];

const loading = ref(false);
const user = ref(null);
api.getUser(token.value)
  .then((res) => {
    user.value = res;
    loading.value = false;
  });

async function checkOut() {
  console.log(JSON.stringify(orderLines.value));
  api.createOrder(token.value, orderLines.value)
    .then((order) => {
      cartStore.emptyCart();
      router.push(`/cart/checkout/success?order=${order.number}`);
    });
}
</script>

<template>
  <div id="cart">
    <CheckOutSteps :steps="steps" />
    <div class="container">
      <PageSpinner v-if="loading" />
      <div
        v-if="user && !loading"
        class="row"
      >
        <div class="col col-lg-8">
          <h3>Payment details</h3>
          <div class="row">
            <div class="row mb-3">
              <div class="col">
                <label class="form-label">First name</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="user.first_name"
                  placeholder="First name"
                  aria-label="First name"
                >
              </div>
              <div class="col">
                <label class="form-label">Last name</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="user.last_name"
                  placeholder="Last name"
                  aria-label="Last name"
                >
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label class="form-label">Credit Card</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  v-model="user.credit_card"
                  placeholder="Credit Card"
                  aria-label="Credit Card"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col col-lg-4">
          <h3>Order info</h3>
          <div
            id="contact-info"
            class="mt-3 px-1"
          >
            <strong>Order: </strong>
            <br />
            <span v-for="line in orderLines">
              {{ line.quantity }}x {{ line.product.title }} <br />
            </span>
            <br />
            <span>Total: $ {{ orderTotal.toFixed(2) }}</span>
          </div>
          <div
            id="shipping-info"
            class="mt-3 px-1"
          >
            <strong>Shipping: </strong>
            <span>
              <br />
              {{ user.first_name }} {{ user.last_name }} <br />
              {{ user.address }} <br />
              {{ user.city }} {{ user.country }} <br />
            </span>
          </div>
          <div
            id="contact-info"
            class="mt-3 px-1"
          >
            <strong>Contact: </strong>
            <span>
              <br />
              {{ user.email }} <br />
              {{ user.phone }} <br />
            </span>
          </div>
        </div>
      </div>
      <div class="row pt-5">
        <div class="col">
          <button
            type="button"
            class="btn btn-dark"
            style="padding-left: 2.5rem; padding-right: 2.5rem;"
            @click="router.push('/cart/shipping')"
          >Back to Shipping</button>
        </div>
        <div class="col clearfix">
          <button
            type="button"
            class="btn btn-dark float-end"
            style="padding-left: 2.5rem; padding-right: 2.5rem;"
            @click="checkOut"
          >Pay Now</button>
        </div>
      </div>
    </div>
  </div>
</template>