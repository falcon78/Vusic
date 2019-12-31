<template>
  <div v-if="getNowPlayingStatus" class="player">
    <div class="image-and-titles">
      <img :src="getNowPlayingStatus.artwork" :alt="`artwork of ${getNowPlayingStatus}`" />
      <div class="image-and-titles__label-container">
        <div :title="getNowPlayingStatus.title" class="truncate title">
          {{ getNowPlayingStatus.title }}
        </div>
        <div
          :title="getNowPlayingStatus.albumName"
          class="truncate link-color-text clickable info"
          @click="
            routeToAlbum(
              getNowPlayingStatus.artistName,
              getNowPlayingStatus.albumName,
              getNowPlayingStatus.id,
            )
          "
        >
          {{ getNowPlayingStatus.albumName }}
        </div>
        <div :title="getNowPlayingStatus.artistName" class="truncate link-color-text info">
          {{ getNowPlayingStatus.artistName }}
        </div>
      </div>
    </div>
    <div class="play-status">
      <play-pause-skip-controls></play-pause-skip-controls>
      <div>
        <vue-slider
          :value="playbackTimeInfo.currentPlaybackTime"
          :min="0"
          :max="playbackTimeInfo.currentPlaybackDuration || 10"
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
      <player-buttons />
    </div>
    <div class="controls"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import VueSlider from 'vue-slider-component';
import PlayPauseSkipControls from './PlayPauseSkipControls.vue';
import PlayerButtons from '@/components/Player/PlayerButtons';
import getSafeMixin from '@/components/Mixins/getSafeMixin';
import musicMixin from '@/components/Mixins/musicMixin';

export default {
  name: 'music-player',
  components: {
    PlayerButtons,
    VueSlider,
    PlayPauseSkipControls,
  },
  mixins: [getSafeMixin, musicMixin],
  computed: {
    ...mapGetters('player', {
      getNowPlayingStatus: 'getNowPlayingStatus',
    }),
    ...mapState('player', {
      playbackTimeInfo: (state) => state.playbackTimeInfo,
    }),
    currentTimeInMinutes() {
      return this.getSafe(() =>
        MusicKit.formatMediaTime(this.playbackTimeInfo.currentPlaybackTime),
      );
    },
    currentDurationInMinutes() {
      return this.getSafe(() =>
        MusicKit.formatMediaTime(this.playbackTimeInfo.currentPlaybackDuration || 0),
      );
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
