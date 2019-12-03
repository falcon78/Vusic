<template>
  <div v-if="!!getNowPlayingStatus.id" class="player">
    <vue-slider
      :value="currentPlaybackTime"
      :min="1"
      :max="getNowPlayingStatus.duration"
      @change="changePlayPosition"
      class="scrubber"
    />
    <p>{{ getNowPlayingStatus.title }}</p>
    <p>{{ getNowPlayingStatus.albumName }}</p>
    <p>{{ getNowPlayingStatus.id }}</p>
    <p>{{ getNowPlayingStatus.playProgress }}</p>
    <p>{{ getNowPlayingStatus.duration }}</p>
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
      currentPlaybackTime: (state) => state.playbackTimeInfo.currentPlaybackTime,
    }),
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

<style lang="scss" scoped>
.progress {
  width: 100%;
  margin-top: -15px;
  user-select: none;
  &__top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__duration {
    color: #71829e;
    font-weight: 700;
    font-size: 20px;
    opacity: 0.5;
  }
  &__time {
    margin-top: 2px;
    color: #71829e;
    font-weight: 700;
    font-size: 16px;
    opacity: 0.7;
  }
}
.progress__bar {
  height: 6px;
  width: 100%;
  cursor: pointer;
  background-color: #d0d8e6;
  display: inline-block;
  border-radius: 10px;
}
.progress__current {
  height: inherit;
  width: 0;
  background-color: #a3b3ce;
  border-radius: 10px;
}
</style>
