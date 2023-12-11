<template>
  <div>
    <div v-if="showModal" class="fixed inset-0 overflow-y-auto bg-black opacity-50"></div>
    <div v-if="showModal" class="fixed inset-0 overflow-y-auto flex items-center justify-center z-30">
      <div class="bg-white p-6 rounded-lg shadow-2xl">
        <img @click="closeModal" class="cursor-pointer mb-2" src="~/public/x.svg" width="26" heigh="26">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const YourComponent = {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};

export default YourComponent;
</script>

<style scoped>
/* Add any specific styling for your modal here */
</style>
