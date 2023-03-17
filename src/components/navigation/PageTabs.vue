<script setup>
defineProps({
  tabs: Array
});
</script>

<template>
  <ul class="nav nav-tabs">
    <li v-for="tab in tabs" :key="tab.label" class="nav-item">
      <a class="nav-link" :class="tab.active ? 'active' : ''" :href="tab.link">{{ tab.label }}</a>
    </li>
  </ul>
</template>
