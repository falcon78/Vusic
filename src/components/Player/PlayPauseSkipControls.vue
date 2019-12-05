<template>
  <div class="play-pause-skip-controls">
    <arrow-left-icon
      size="2.5x"
      class="play-pause-skip-controls__icons"
      @click="previous"
    ></arrow-left-icon>
    <div v-if="getNowPlayingStatus.isLoading || fakeLoading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <play-icon
      v-else-if="!isPlaying"
      size="2.5x"
      class="play-pause-skip-controls__icons"
      @click="togglePlayPause"
    ></play-icon>
    <pause-icon
      v-else
      size="2.5x"
      class="play-pause-skip-controls__icons"
      @click="togglePlayPause"
    ></pause-icon>

    <arrow-right-icon
      size="2.5x"
      class="play-pause-skip-controls__icons"
      @click="next"
    ></arrow-right-icon>
  </div>
</template>

<script>
import { PlayIcon, PauseIcon, ArrowRightIcon, ArrowLeftIcon } from 'vue-feather-icons';
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'play-pause-skip-controls',
  components: {
    PlayIcon,
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
