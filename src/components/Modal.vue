<template>
  <div class="modal">
    <div class="modal-top">
      <h2 class="browse-page-category">{{ titleName }}</h2>
      <div class="button modal-close" @click="$emit('clicked')">
        <font-awesome-icon icon="window-close" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    titleName: String,
  },
};
</script>

<style scoped></style>
