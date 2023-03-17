<script setup>
import { storeToRefs } from 'pinia';

import IconMinus from '@/components/icons/IconMinus.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import LoginForm from '@/views/auth/LoginForm.vue';
import CheckOutSteps from '@/views/cart/CheckOutSteps.vue';
import StarRating from '@/views/product/StarRating.vue';

const steps = [
  { label: 'Review Cart', active: true, finished: false },
  { label: 'Shipping Details', active: false, finished: false },
  { label: 'Check Out', active: false, finished: false }
];

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const cartStore = useCartStore();
const { orderLines } = storeToRefs(cartStore);

function deleteLine(curr) {
  const index = orderLines.value.findIndex((line) => line.product.number == curr.product.number);
  cartStore.removeLine(index);
}

function minus(curr) {
  if (curr.quantity > 1) {
    curr.quantity--;
    cartStore.updateLocalStorage();
  } else deleteLine(curr);
}

function plus(curr) {
  curr.quantity++;
  cartStore.updateLocalStorage();
}

function logout() {
  authStore.logout('/cart');
}
</script>

<template>
  <div id="cart">
    <CheckOutSteps :steps="steps" />
    <div class="container">
      <div class="row">
        <div class="col col-lg-8 px-5">
          <h3>Your products</h3>

          <div
            id="'cart-empty-alert'"
            class="alert alert-warning mt-5 px-4"
            role="alert"
            v-if="cartStore.numLines == 0"
          >
            Your shopping cart is empty.
          </div>

          <div id="cart-content" class="mt-4">
            <div v-for="line in orderLines" :key="line.product.number" class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <a :href="`/product/${line.product.number}`">
                    <img
                      :src="`/${line.product.image}`"
                      class="img-fluid rounded-start"
                      style="object-fit: contain; padding: 24px"
                      :alt="line.product.description"
                    />
                  </a>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <a
                      :href="`/product/${line.product.number}`"
                      style="text-decoration: none"
                      class="text-body"
                    >
                      <h5 class="card-title">{{ line.product.title }}</h5>
                    </a>
                    <p class="card-text text-muted">{{ line.product.category }}</p>
                    <StarRating
                      :rating="line.product.rating.rate"
                      :reviews="line.product.rating.count"
                    />
                    <div class="row pt-2">
                      <div class="col">Price: <br />$ {{ line.product.price }}</div>
                      <div class="col">
                        &nbsp; <br />
                        <a href="#" @click="minus(line)">
                          <IconMinus />
                        </a>
                        <strong class="px-3">{{ line.quantity }}</strong>
                        <a href="#" @click="plus(line)">
                          <IconPlus />
                        </a>
                      </div>
                      <div class="col">
                        Total: <br />$ {{ (line.product.price * line.quantity).toFixed(2) }}
                      </div>
                      <div class="col">
                        &nbsp; <br />
                        <a href="#" class="link-dark" @click="deleteLine(line)">
                          <IconTrash />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col col-lg-4">
          <h3>Account</h3>
          <div v-if="authStore.loggedIn" class="mt-3">
            <form>
              <div class="form-outline mb-3">
                <label class="form-label">Email address</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="form-control"
                  disabled
                  placeholder="john.doe@hotmail.com"
                />
              </div>

              <div class="form-outline mb-3">
                <label class="form-label">First name</label>
                <input
                  type="text"
                  v-model="user.first_name"
                  class="form-control"
                  disabled
                  placeholder="First name"
                />
              </div>

              <div class="form-outline mb-3">
                <label class="form-label">Last name</label>
                <input
                  type="text"
                  v-model="user.last_name"
                  class="form-control"
                  disabled
                  placeholder="Last name"
                />
              </div>

              <div class="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  class="btn btn-dark"
                  style="padding-left: 2.5rem; padding-right: 2.5rem"
                  @click="router.push('/cart/shipping')"
                >
                  To Shipping
                </button>
                <p class="small fw-bold mt-3 mb-0">
                  Not you? &nbsp;
                  <a href="#" class="link-danger" @click="logout">Log out</a>
                </p>
              </div>
            </form>
          </div>
          <div v-if="!authStore.loggedIn" class="mt-3">
            <LoginForm redirect="/cart" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
