<template>
  <div id="app" class="is-fullheight scrollbar">
    <home />
  </div>
</template>

<style lang="scss">
.columns {
  margin: 0 !important;
}
</style>
<script>
import Home from '@/views/Home.vue';

export default {
  components: { Home },
};
</script>
