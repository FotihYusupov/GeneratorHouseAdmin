<!-- components/Card.vue -->
<template>
  <li class="w-80 mb-2">
    <NuxtLink :to="cardLink">
      <div class="max-w-xs bg-blue-600 shadow-lg rounded-lg overflow-hidden mb-4 border transition-transform transform hover:scale-105">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 bg-blue-600 text-white">{{ title }}</div>
          <!-- Additional card content can be added here -->
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    cardLink: {
      type: String,
      required: true,
    },
  },
};
</script>
<!-- 
<style scoped>
/* Add your custom styles here */
</style> -->
