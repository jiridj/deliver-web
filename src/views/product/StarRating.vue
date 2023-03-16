<script setup>
import IconEmptyStar from '@/components/icons/IconEmptyStar.vue';
import IconFullStar from '@/components/icons/IconFullStar.vue';
import IconHalfStar from '@/components/icons/IconHalfStar.vue';

const props = defineProps(['rating', 'reviews']);
</script>

<template>
  <div class="d-flex justify-content-begin align-items-center mb-3">
    <div class="ratings">
      <span v-for="n in 4">
        <IconFullStar v-if="rating >= n" />
        <IconEmptyStar v-if="rating < n" />
        <IconHalfStar v-if="rating > n && rating < (n + 1)" />
      </span>
    </div>
    <div class="px-3 align-bottom">{{ props.reviews }} Reviews</div>
  </div>
</template>