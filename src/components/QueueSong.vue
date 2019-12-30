<template>
  <div
    class="song"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :style="isSelfPlaying && { backgroundColor: 'rgba(0,0,0,0.6)' }"
  >
    <div class="track-number">
      <p>{{ index }}</p>
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
      <div class="song-play-button" v-else-if="hover" @click="changeToMediaItem(track)">
        <font-awesome-icon class="play-pause-skip-controls__icons" icon="play" />
      </div>
    </div>

    <div class="song-details">
      <p :class="isExplicit && 'explicit-content'" :title="track.attributes.name">
        {{ track.attributes.name }}
      </p>
      <p class="song-album">
        {{ track.attributes.albumName }}
      </p>
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
import playMixin from '@/components/Mixins/playMixin';
export default {
  name: 'queue-song',
  props: {
    track: Object,
    index: Number,
  },
  mixins: [musicMixin, playMixin],
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
    ownId() {
      return this.track.id;
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
