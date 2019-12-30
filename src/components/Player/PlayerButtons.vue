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
    <div @click="setLyricsModal()">
      <font-awesome-icon
        class="play-pause-skip-controls__icons"
        icon="comment-alt"
        :style="{ color: lyricsModal ? '#ff7597' : 'white' }"
        title="lyrics"
      />
    </div>
    <div @click="setYoutubeModal()">
      <font-awesome-icon
        class="play-pause-skip-controls__icons"
        icon="video"
        title="Music Video"
        :style="{ color: youtubeModal ? '#ff7597' : 'white' }"
      />
    </div>
    <div @click="unShuffle">
      <font-awesome-icon
        class="play-pause-skip-controls__icons"
        icon="random"
        :style="{ color: shuffle === 1 ? '#ff7597' : 'white' }"
        title="Shuffle"
      />
    </div>
    <div @click="setRepeatStatus()">
      <font-awesome-icon
        class="play-pause-skip-controls__icons "
        icon="redo"
        :style="{ color: repeat === 0 ? 'white' : '#ff7597' }"
        title="Repeat"
      />
    </div>
    <p class="repeat-one" v-if="repeat === 1">1</p>
    <div @click="setQueueModal()">
      <font-awesome-icon
        class="play-pause-skip-controls__icons"
        icon="list"
        title="queue"
        :style="{ color: queueModal ? '#ff7597' : 'white' }"
      />
    </div>
    <div @click="optionVisible = true">
      <font-awesome-icon class="play-pause-skip-controls__icons" icon="ellipsis-h" style="" />
      <options-menu
        :isPlayer="true"
        @close:options="optionVisible = false"
        :position="'bottom: 0; right: -10px; height: 130px'"
        v-if="optionVisible"
        @add:library="addToLibrary([currentlyPlaying.id], currentlyPlaying.attributes.name)"
        @love="rateItem(currentlyPlaying, 1)"
        @dislike="rateItem(currentlyPlaying, -1)"
      />
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import { mapActions, mapMutations, mapState } from 'vuex';
import playMixin from '@/components/Mixins/playMixin';
import OptionsMenu from '@/assets/Components/OptionsMenu';
export default {
  name: 'PlayerButtons',
  components: { OptionsMenu, VueSlider },
  data() {
    return {
      volumeVisible: false,
      optionVisible: false,
    };
  },
  mixins: [playMixin],
  computed: {
    ...mapState('player', {
      volumeState: (state) => state.volume,
      repeat: (state) => state.repeat,
      shuffle: (state) => state.shuffle,
      currentlyPlaying: (state) => state.currentlyPlaying,
    }),
    ...mapState('modals', {
      lyricsModal: (state) => state.lyricsModal,
      queueModal: (state) => state.queueModal,
      youtubeModal: (state) => state.youtubeModal,
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
      setQueueModal: 'setQueueModal',
      setYoutubeModal: 'setYoutubeModal',
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
