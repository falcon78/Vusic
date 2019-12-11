<template>
  <div class="play-pause-skip-controls">
    <arrow-left-icon size="2.5x" class="play-pause-skip-controls__icons" @click="previous" />
    <div v-if="getNowPlayingStatus.isLoading || fakeLoading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <font-awesome-icon
      class="play-pause-skip-controls__icons"
      v-else-if="!isPlaying"
      size="2x"
      icon="play"
      @click="togglePlayPause"
    />
    <pause-icon
      v-else
      size="2.5x"
      class="play-pause-skip-controls__icons"
      @click="togglePlayPause"
    />
    <arrow-right-icon size="2.5x" class="play-pause-skip-controls__icons" @click="next" />
  </div>
</template>

<script>
import { PauseIcon, ArrowRightIcon, ArrowLeftIcon } from 'vue-feather-icons';
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'play-pause-skip-controls',
  components: {
    PauseIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
  },
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
