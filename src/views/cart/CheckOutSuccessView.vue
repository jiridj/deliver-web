<script setup>
import { useRoute } from 'vue-router';

import router from '@/router';
import CheckOutSteps from '@/views/cart/CheckOutSteps.vue';

const route = useRoute();
const number = parseInt(route.query.order);

const steps = [
  { label: 'Review Cart', active: false, finished: true },
  { label: 'Shipping Details', active: false, finished: true },
  { label: 'Check Out', active: false, finished: true },
];
</script>

<template>
  <div id="success">
    <CheckOutSteps :steps="steps" />
    <div class="container pt-5 mx-5 px-5 clearfix">
      <div class="alert alert-success">
        Order with number {{ number }} created!
      </div>
      <button
        type="button"
        class="btn btn-dark float-end"
        style="padding-left: 2.5rem; padding-right: 2.5rem;"
        @click="router.push('/')"
      >Back to Shop</button>
    </div>
  </div>
</template>