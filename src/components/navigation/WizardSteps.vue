<script setup>
defineProps(['steps']);
</script>

<template>
  <div class="wizard-steps">
    <span
      v-for="step in steps"
      class="wizard-step"
      :class="[
        step.active ? 'active' : '',
        step.finished ? 'finished' : ''
      ]"
    >
      {{ step.label }}
    </span>
  </div>
</template>

<style scoped>
.wizard-steps {
  gap: 5px;
  text-align: center;
  margin-bottom: 8vh;
}

.wizard-steps .wizard-step {
  position: relative;
  flex: 1;
  padding-bottom: 5vh;
  padding-left: 7vw;
  padding-right: 7vw;
}

.wizard-steps .wizard-step a {
  text-decoration: none;
}

.wizard-steps .wizard-step.active {
  font-weight: 600;
}

.wizard-steps .wizard-step.finished {
  font-weight: 600;
  color: #0d6efd;
}

.wizard-steps .wizard-step::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 9;
  width: 30px;
  height: 30px;
  background-color: #cfe2ff;
  border-radius: 50%;
  border: 3px solid #cfe2ff;
}

.wizard-steps .wizard-step.active::before {
  background-color: #6ea8fe;
  border: 3px solid #cfe2ff;
}

.wizard-steps .wizard-step.finished::before {
  background-color: #0d6efd;
  border: 3px solid #cfe2ff;
}

.wizard-steps .wizard-step::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 13px;
  width: 100%;
  height: 3px;
  background-color: #f3f3f3;
}

.wizard-steps .wizard-step.active::after {
  background-color: #f3f3f3;
}

.wizard-steps .wizard-step.finished::after {
  background-color: #9ec5fe;
}

.wizard-steps .wizard-step:last-child:after {
  display: none;
}
</style>