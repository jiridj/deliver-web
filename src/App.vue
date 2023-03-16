<script setup>
import { RouterView } from 'vue-router';

import NavHeader from '@/components/navigation/NavHeader.vue';
import NavFooter from '@/components/navigation/NavFooter.vue';

const appMode = import.meta.env.VITE_DELIVER_APP_MODE;
const appColors = import.meta.env.VITE_DELIVER_APP_COLORS;
</script>

<template>
  <div class="container-sm">
    <header>
      <NavHeader
        :mode="appMode"
        :colors="appColors"
      />
    </header>

    <main class="mt-5 pt-5 mb-5 pb-5">
      <RouterView />
    </main>

    <footer>
      <NavFooter
        :mode="appMode"
        :colors="appColors"
      />
    </footer>
  </div>
</template>