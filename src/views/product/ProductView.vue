<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import * as api from '@/api';
import PageSpinner from '@/components/spinner/PageSpinner.vue';
import router from '@/router';
import { useAlertStore } from '@/stores/alert';
import { useCartStore } from '@/stores/cart';
import StarRating from '@/views/product/StarRating.vue';

const loading = ref(true);

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
alertStore.clear();

const route = useRoute();
const productNumber = parseInt(route.params.number) || 1;

const product = ref(null);
api.getProduct(productNumber)
  .then((data) => {
    product.value = data;
    loading.value = false;
  });

const quantity = ref(1);

function addToCart(e) {
  const cartStore = useCartStore();
  cartStore.addLine(product.value, quantity.value);
  alertStore.success('Product added to your shopping cart')
}

function buyNow(e) {
  addToCart();
  router.push('/cart');
}
</script>

<template>
  <PageSpinner v-if="loading" />

  <div v-if="!loading">
    <div class="row">
      <div class="col">
        <img
          :src="`/${product.image}`"
          :alt="product.description"
          class="pt-5 pl-5"
          style="max-width:80%; max-height: 70vh;"
        />
      </div>
      <div class="col">
        <h3>{{ product.title }}</h3>
        <h5 class="text-secondary mb-3">{{ product.category }}</h5>
        <StarRating
          :rating="product.rating.rate"
          :reviews="product.rating.count"
        />
        <h1>$ {{ product.price }}</h1>
        <hr />
        <p class="mt-3 mb-3 pt-3 pb-3">{{ product.description }}</p>
        <hr />
        <div class="d-flex flex-row">
          <div class="col-xs-6">
            <input
              id="qtyInput"
              type="number"
              class="form-control"
              min="1"
              step="1"
              v-model="quantity"
            >
          </div>
          <div class="col-xs-6">
            <button
              class="btn btn-primary"
              style="margin-left: 10px;"
              @click="addToCart()"
            >Add to Cart</button>
            <button
              class="btn btn-success"
              style="margin-left: 5px;"
              @click="buyNow()"
            >Buy Now</button>
          </div>
        </div>
        <div
          id="'cart-alert'"
          class="alert mt-5"
          :class="(alert ? alert.type : '')"
          role="alert"
          :hidden="alertStore.hideAlert"
        >
          {{ (alert ? alert.message : '') }}
        </div>
      </div>
    </div>
  </div>
</template>