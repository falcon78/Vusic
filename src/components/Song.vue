<template>
  <div
    class="song"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :style="isSelfPlaying && { backgroundColor: '#282828' }"
  >
    <div class="track-number">
      <p v-if="playParams.kind === 'album'">{{ track.attributes.trackNumber }}</p>
      <p v-else>{{ index + 1 }}</p>
    </div>
    <div class="song-image">
      <img
        :src="getUrl(track.attributes.artwork, 40)"
        alt="`artwork of track ${track.attributes.name}`"
      />
      <div class="song-play-button" v-if="isSelfPlaying && isPlayable">
        <font-awesome-icon
          v-if="nowPlaying.isPlaying"
          class="play-pause-skip-controls__icons"
          icon="pause"
          @click="togglePlayPause"
        />
        <font-awesome-icon
          v-else
          class="play-pause-skip-controls__icons"
          icon="play"
          @click="togglePlayPause"
        />
      </div>
      <div
        class="song-play-button"
        v-else-if="hover && isPlayable"
        @click="playSongFromItems(playItems, track)"
      >
        <font-awesome-icon class="play-pause-skip-controls__icons" icon="play" />
      </div>
    </div>

    <div class="song-details">
      <p
        :class="isExplicit && 'explicit-content'"
        :title="isPlayable ? track.attributes.name : 'Error: Item is not playable.'"
        :style="!isPlayable && 'color: #868686'"
      >
        {{ track.attributes.name }}
      </p>
      <a
        @click="routeToAlbum(track.attributes.artistName, track.attributes.albumName, ownId)"
        class="song-album"
        :title="isPlayable ? track.attributes.albumName : 'Error: Item is not playable.'"
      >
        {{ track.attributes.albumName }}
      </a>
    </div>

    <div v-if="!hover" class="song-time-stamp">
      {{ milliToMinutes(track.attributes.durationInMillis) }}
    </div>
    <div v-else class="song-time-stamp " @click="showMenu($event)">
      <font-awesome-icon class="song-option" icon="ellipsis-h" />
    </div>
    <transition name="fade">
      <options-menu
        v-if="optionsMenu"
        :position="this.moveMenuDown ? 'bottom: -150px; right: 1px' : 'bottom: 15px; right: 1px'"
        @mouse:leave="optionsMenu = false"
        @play:next="playNext({ items: [track] })"
        @play:later="playLater({ items: [track] })"
        @add:library="addToLibrary([ownId], track.attributes.name)"
        @love="rateItem(track, 1)"
        @dislike="rateItem(track, -1)"
      />
    </transition>
  </div>
</template>

<script>
import helpers from '@/store/helpers';
import { mapActions, mapGetters, mapState } from 'vuex';
import musicMixin from '@/components/Mixins/musicMixin';
import playMixin from '@/components/Mixins/playMixin';
import OptionsMenu from '@/assets/Components/OptionsMenu';
import getSafeMixin from '@/components/Mixins/getSafeMixin';
export default {
  name: 'song',
  components: { OptionsMenu },
  props: {
    track: Object,
    index: Number,
    playItems: Array,
    playParams: Object,
  },
  mixins: [musicMixin, playMixin, getSafeMixin],
  data() {
    return {
      hover: false,
      isLibrary: helpers.getSafe(() => this.$route.meta.isLibrary),
      optionsMenu: false,
      moveMenuDown: false,
    };
  },
  methods: {
    ...mapActions('player', {
      togglePlayPause: 'togglePlayPause',
    }),
    showMenu(event) {
      this.optionsMenu = true;
      if (event.pageY < 330) {
        this.moveMenuDown = true;
      }
    },
  },
  computed: {
    ...mapGetters('player', {
      nowPlaying: 'getNowPlayingStatus',
    }),
    ...mapState('player', {
      isPlaying: (state) => state.isPlaying,
    }),
    isPlayable() {
      return this.getSafe(() => !!this.track.attributes.playParams);
    },
    ownId() {
      let id = null;
      if (this.isLibrary) {
        id = this.getSafe(() => this.track.attributes.playParams.catalogId, null);
      } else {
        id = this.getSafe(() => this.track.attributes.playParams.id, null);
      }
      return id;
    },
    isSelfPlaying() {
      return this.nowPlaying.id === this.ownId;
    },
    isExplicit() {
      return this.getSafe(() => this.track.attributes.contentRating === 'explicit');
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
