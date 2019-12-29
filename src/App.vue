<template>
  <div id="app" class="is-fullheight">
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
import { mapState } from 'vuex';

export default {
  components: { Home },
  computed: {
    ...mapState('music', {
      searchTyping: (state) => state.searchTyping,
    }),
  },
  mounted() {
    document.body.addEventListener(
      'keyup',
      (e) => {
        // dont react when typing
        if (this.searchTyping) return;
        if (e.code == 32 || e.keyCode == 32) {
          e.preventDefault();
          this.$store.dispatch('player/togglePlayPause');
        }
      },
      false,
    );
    document.addEventListener(
      'mousedown',
      function(event) {
        if (event.detail > 1) {
          event.preventDefault();
        }
      },
      false,
    );
  },
};
</script>
