<template>
  <div class="player-buttons">
    <font-awesome-icon
      @mouseenter="volumeVisible = true"
      class="play-pause-skip-controls__icons"
      :icon="volume === 0 ? 'volume-mute' : 'volume-up'"
      :style="{ color: volumeVisible ? 'rgba(0,0,0,0)' : 'white' }"
    />

    <transition name="fade">
      <div class="volume-slider" @mouseleave="volumeVisible = false" v-if="volumeVisible">
        <vue-slider
          direction="btt"
          v-model="volume"
          :min="0"
          :max="1"
          :height="100"
          :interval="0.02"
          :tooltip-placement="'right'"
          :tooltip-formatter="(value) => Math.round(value * 100)"
        />
      </div>
    </transition>
    <font-awesome-icon
      class="play-pause-skip-controls__icons"
      icon="comment-alt"
      :style="{ color: lyricsModal ? '#ff7597' : 'white' }"
      @click="setLyricsModal()"
    />
    <font-awesome-icon class="play-pause-skip-controls__icons" icon="video" />
    <font-awesome-icon
      class="play-pause-skip-controls__icons"
      icon="random"
      @click="unShuffle"
      :style="{ color: shuffle === 1 ? '#ff7597' : 'white' }"
    />
    <font-awesome-icon
      class="play-pause-skip-controls__icons "
      icon="redo"
      :style="{ color: repeat === 0 ? 'white' : '#ff7597' }"
      @click="setRepeatStatus()"
    />
    <p class="repeat-one" v-if="repeat === 1">1</p>
    <!--<font-awesome-icon class="play-pause-skip-controls__icons" icon="heart" />-->
    <font-awesome-icon class="play-pause-skip-controls__icons" icon="list" />
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import { mapActions, mapMutations, mapState } from 'vuex';
import playMixin from '@/components/Mixins/playMixin';
export default {
  name: 'PlayerButtons',
  components: { VueSlider },
  data() {
    return {
      volumeVisible: false,
    };
  },
  mixins: [playMixin],
  computed: {
    ...mapState('player', {
      volumeState: (state) => state.volume,
      repeat: (state) => state.repeat,
      shuffle: (state) => state.shuffle,
    }),
    ...mapState('modals', {
      lyricsModal: (state) => state.lyricsModal,
    }),
    volume: {
      get() {
        return this.volumeState;
      },
      set(value) {
        this.setVolume({ volume: value });
      },
    },
  },
  methods: {
    ...mapActions('player', {
      setVolume: 'setVolume',
      setRepeatStatus: 'setRepeatStatus',
      setShuffle: 'setShuffle',
    }),
    ...mapMutations('modals', {
      setLyricsModal: 'setLyricsModal',
    }),
    unShuffle() {
      this.setShuffle();
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
