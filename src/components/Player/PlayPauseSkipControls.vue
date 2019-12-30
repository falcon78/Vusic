<template>
  <div class="play-pause-skip-controls">
    <font-awesome-icon
      class="play-pause-skip-controls__icons"
      size="2x"
      icon="arrow-left"
      @click="previous"
    />
    <div v-if="getNowPlayingStatus.isLoading || fakeLoading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div v-else-if="!isPlaying" @click="togglePlayPause">
      <font-awesome-icon class="play-pause-skip-controls__icons" size="2x" icon="play" />
    </div>
    <div v-else @click="togglePlayPause">
      <font-awesome-icon class="play-pause-skip-controls__icons" size="2x" icon="pause" />
    </div>
    <font-awesome-icon
      class="play-pause-skip-controls__icons"
      size="2x"
      icon="arrow-right"
      @click="next"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'play-pause-skip-controls',

  data() {
    return {};
  },
  methods: {
    ...mapActions('player', {
      play: 'play',
      pause: 'pause',
      next: 'next',
      previous: 'previous',
      togglePlayPause: 'togglePlayPause',
    }),
  },
  computed: {
    ...mapState('player', {
      isPlaying: (state) => state.isPlaying,
      fakeLoading: (state) => state.fakeLoading,
    }),
    ...mapGetters('player', {
      getNowPlayingStatus: 'getNowPlayingStatus',
    }),
  },
};
</script>
