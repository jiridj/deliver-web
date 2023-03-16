<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import PageControl from '@/components/pagination/PageControl.vue';
import PageSpinner from '@/components/spinner/PageSpinner.vue';
import StarRating from '@/views/product/StarRating.vue';

import * as api from '@/api';

const route = useRoute();
const pageNum = parseInt(route.query.page) || 1;
const pageSize = parseInt(route.query.size) || 10;

const loading = ref(true);
const page = ref(null);
api.getProducts(pageNum, pageSize)
  .then((data) => {
    page.value = data;
    loading.value = false;
  });
</script>

<template>
  <!-- shop header -->
  <div class="jumbotron">
    <h1 class="display-4">Deliberately Vulnerable!</h1>
    <p class="lead">
      Enjoy a delightful shopping experience on the most vulnerable webshop you've ever encountered. <br />
      Spoiler alert, we don't actually ship nor charge. Don't enter real data!
    </p>
    <hr class="my-4">
  </div>

  <PageSpinner v-if="loading" />

  <div v-if="!loading">
    <!-- pagination -->
    <PageControl
      v-if="page"
      :page="pageNum"
      :size="pageSize"
      :pages="Math.ceil(page.total / page.size)"
      :link="''"
    />

    <!-- product cards -->
    <div v-if="page">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div
          class="col"
          v-for="product in page.products"
        >
          <div class="card mb-3">
            <div class="card-body">
              <a :href="`/product/${product.number}`">
                <div class="ratio ratio-1x1 mb-3">
                  <img
                    :src="`/${product.image}`"
                    class="card-img-top"
                    style="object-fit: contain;"
                    :alt="product.description"
                  >
                </div>
              </a>
              <h5 class="card-title mb-3">$ {{ product.price.toFixed(2) }}</h5>
              <div style="min-height: 3.5rem;">
                <h6 class="card-subtitle mb-3">{{ product.title }}</h6>
              </div>
              <StarRating
                :rating="product.rating.rate"
                :reviews="product.rating.count"
              />
              <div>

              </div>
              <div class="d-flex justify-content-end">
                <a
                  class="btn btn-secondary"
                  :href="`/product/${product.number}`"
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination -->
    <div class="mt-3">
      <PageControl
        v-if="page"
        :page="pageNum"
        :size="pageSize"
        :pages="Math.ceil(page.total / page.size)"
        :link="''"
      />
    </div>
  </div>
</template>
