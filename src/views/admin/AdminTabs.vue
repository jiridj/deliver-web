<script setup>
import PageTabs from '@/components/navigation/PageTabs.vue';

const props = defineProps({
  selected: String,
})
</script>

<template>
  <PageTabs :tabs="[
    { label: 'Users', active: (selected == 'users' ? true : false), link: '/admin/users' }
  ]" />
</template>