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
  mounted() {
    document.body.onkeyup = (e) => {
      if (e.keyCode == 32) {
        this.$store.dispatch('player/togglePlayPause');
      }
    };
  },
};
</script>
