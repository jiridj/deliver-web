<script setup>
import IconGitHub from '../icons/IconGitHub.vue';

defineProps(['mode', 'colors']);
</script>

<template>
  <nav class="navbar fixed-bottom" :class="['navbar-' + mode, 'bg-' + colors]">
    <div class="container-md">
      <span class="navbar-text"> The DELIberately Vulnerable E-commeRce application.</span>
      <div class="navbar-nav justify-content-end">
        <li>
          <a class="nav-link" href="https://github.com/jiridj/deliver-web">
            <IconGitHub />
          </a>
        </li>
      </div>
    </div>
  </nav>
</template>
