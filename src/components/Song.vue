<template>
  <div
    class="song"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :style="isSelfPlaying && { backgroundColor: '#282828' }"
  >
    <div v-if="!playParams.kind === 'song'" class="track-number">
      <p v-if="playParams.kind === 'album'">{{ track.attributes.trackNumber }}</p>
      <p v-else-if="playParams.kind === 'playlist'">{{ index + 1 }}</p>
    </div>
    <div class="song-image">
      <img
        :src="getUrl(track.attributes.artwork, 40)"
        alt="`artwork of track ${track.attributes.name}`"
      />
      <div class="song-play-button" v-if="isSelfPlaying">
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
      <div class="song-play-button" v-else-if="hover" @click="playSongFromItems(playParams, index)">
        <font-awesome-icon class="play-pause-skip-controls__icons" icon="play" />
      </div>
    </div>

    <div class="song-details">
      <p class="song-track-name" :title="track.attributes.name">{{ track.attributes.name }}</p>
      <a
        @click="routeToAlbum(track.attributes.artistName, track.attributes.albumName)"
        class="song-album"
        >{{ track.attributes.albumName }}</a
      >
    </div>
    <div class="song-time-stamp">
      {{ milliToMinutes(track.attributes.durationInMillis) }}
    </div>
  </div>
</template>

<script>
import helpers from '@/store/helpers';
import { mapActions, mapGetters, mapState } from 'vuex';
import musicMixin from '@/components/Mixins/musicMixin';
export default {
  name: 'song',
  props: {
    track: Object,
    index: Number,
    playParams: Object,
  },
  mixins: [musicMixin],
  data() {
    return {
      hover: false,
      isLibrary: helpers.getSafe(() => this.$route.meta.isLibrary),
    };
  },
  methods: {
    getUrl: helpers.getUrl,
    getSafe: helpers.getSafe,
    ...mapActions('player', {
      togglePlayPause: 'togglePlayPause',
    }),
  },
  computed: {
    ...mapGetters('player', {
      nowPlaying: 'getNowPlayingStatus',
    }),
    ...mapState('player', {
      isPlaying: (state) => state.isPlaying,
    }),
    isSelfPlaying() {
      if (this.isLibrary) {
        return (
          this.nowPlaying.id === this.getSafe(() => this.track.attributes.playParams.catalogId, 0)
        );
      }
      return this.nowPlaying.id === this.getSafe(() => this.track.attributes.playParams.id, 0);
    },
  },
};
</script>
