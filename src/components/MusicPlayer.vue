<template>
  <div v-if="getNowPlayingStatus" class="player">
    <div class="image-and-titles">
      <img :src="getNowPlayingStatus.artwork" alt="" />
      <div class="image-and-titles__label-container">
        <div class="truncate">{{ getNowPlayingStatus.title }}</div>
        <div class="truncate link-color-text">{{ getNowPlayingStatus.albumName }}</div>
        <div class="truncate link-color-text">{{ getNowPlayingStatus.artistName }}</div>
      </div>
    </div>
    <div class="play-status">
      <div>
        <vue-slider
          :value="playbackTimeInfo.currentPlaybackTime"
          :min="1"
          :max="playbackTimeInfo.currentPlaybackDuration || 3"
          @change="changePlayPosition"
          class="scrubber"
        />
      </div>
      <div class="play-time-labels">
        <div>{{ currentTimeInMinutes.currentTime }}</div>
        <div>{{ currentTimeInMinutes.duration }}</div>
      </div>
    </div>
    <div class="controls"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import VueSlider from 'vue-slider-component';

export default {
  name: 'music-player',
  components: {
    VueSlider,
  },
  computed: {
    ...mapGetters('player', {
      getNowPlayingStatus: 'getNowPlayingStatus',
    }),
    ...mapState('player', {
      playbackTimeInfo: (state) => state.playbackTimeInfo,
    }),
    currentTimeInMinutes() {
      const duration = this.playbackTimeInfo.currentPlaybackDuration;
      const currentTime = this.playbackTimeInfo.currentPlaybackTime;
      return {
        duration: `${Math.floor(duration / 60)}:${duration % 60}`,
        currentTime: `${Math.floor(currentTime / 60)}:${currentTime % 60}`,
      };
    },
  },
  methods: {
    ...mapActions('player', {
      changePlaybackTime: 'changePlaybackTime',
    }),
    async changePlayPosition(time) {
      await this.changePlaybackTime({ time });
    },
  },
};
</script>
