
import WizardSteps from '../../components/navigation/WizardSteps.vue';

<script setup>
import WizardSteps from '../../components/navigation/WizardSteps.vue';

defineProps(['steps']);
</script>

<template>
  <WizardSteps :steps="steps" />
</template>