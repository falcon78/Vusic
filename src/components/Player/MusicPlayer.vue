<template>
  <div v-if="getNowPlayingStatus" class="player">
    <div class="image-and-titles">
      <img :src="getNowPlayingStatus.artwork" alt="" />
      <div class="image-and-titles__label-container">
        <div :title="getNowPlayingStatus.title" class="truncate">
          {{ getNowPlayingStatus.title }}
        </div>
        <div :title="getNowPlayingStatus.albumName" class="truncate link-color-text">
          {{ getNowPlayingStatus.albumName }}
        </div>
        <div :title="getNowPlayingStatus.artistName" class="truncate link-color-text">
          {{ getNowPlayingStatus.artistName }}
        </div>
      </div>
    </div>
    <div v-if="getNowPlayingStatus.isPlaying && currentTimeInMinutes === '0:00'">
      loading
    </div>
    <div v-else class="play-status">
      <play-pause-skip-controls></play-pause-skip-controls>
      <div>
        <vue-slider
          :value="playbackTimeInfo.currentPlaybackTime"
          :min="0"
          :max="playbackTimeInfo.currentPlaybackDuration || 3"
          :tooltip-formatter="convertToMinutes"
          @change="changePlayPosition"
          :lazy="true"
          class="scrubber"
        />
      </div>
      <div class="play-time-labels">
        <div>{{ currentTimeInMinutes }}</div>
        <div>{{ currentDurationInMinutes || '0:00' }}</div>
      </div>
    </div>
    <div class="controls"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import VueSlider from 'vue-slider-component';
import PlayPauseSkipControls from './PlayPauseSkipControls.vue';

export default {
  name: 'music-player',
  components: {
    VueSlider,
    PlayPauseSkipControls,
  },
  computed: {
    ...mapGetters('player', {
      getNowPlayingStatus: 'getNowPlayingStatus',
    }),
    ...mapState('player', {
      playbackTimeInfo: (state) => state.playbackTimeInfo,
    }),
    currentTimeInMinutes() {
      return MusicKit.formatMediaTime(this.playbackTimeInfo.currentPlaybackTime);
    },
    currentDurationInMinutes() {
      return MusicKit.formatMediaTime(this.playbackTimeInfo.currentPlaybackDuration || 0);
    },
  },
  methods: {
    ...mapActions('player', {
      changePlaybackTime: 'changePlaybackTime',
    }),
    async changePlayPosition(time) {
      await this.changePlaybackTime({ time });
    },
    convertToMinutes(sec) {
      return (sec - (sec %= 60)) / 60 + (9 < sec ? ':' : ':0') + sec;
    },
  },
};
</script>
