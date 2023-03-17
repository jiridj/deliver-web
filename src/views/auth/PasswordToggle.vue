<script setup>
import { ref } from 'vue';

import IconEye from '@/components/icons/IconEye.vue';
import IconEyeSlash from '@/components/icons/IconEyeSlash.vue';

defineEmits(['update:password']);

const show = ref(false);
const password = ref('');

function togglePassword() {
  show.value = !show.value;
}
</script>

<template>
  <div class="input-group">
    <input
      :type="show ? 'text' : 'password'"
      class="form-control"
      placeholder="Enter password"
      v-model="password"
      @input="$emit('update:password', password)"
    />
    <span class="input-group-text bg-white">
      <IconEye v-if="!show" @click="togglePassword" />
      <IconEyeSlash v-else @click="togglePassword" />
    </span>
  </div>
</template>
