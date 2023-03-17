<script setup>
import PageTabs from '@/components/navigation/PageTabs.vue';

defineProps({
  selected: String
});
</script>

<template>
  <PageTabs
    :tabs="[
      {
        label: 'User profile',
        active: selected == 'profile' ? true : false,
        link: '/account/profile'
      },
      {
        label: 'Order history',
        active: selected == 'orders' ? true : false,
        link: '/account/orders'
      }
    ]"
  />
</template>
