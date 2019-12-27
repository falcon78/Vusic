<template>
  <div>
    <div class="album-details scrollWrapper" :style="getBackground()">
      <img :src="getUrl(item.attributes.artwork, 200)" alt="artwork of currently viewing item" />
      <div class="album-metadata">
        <div class="albums-attributes">
          <h2 :style="getColor('textColor1')">
            {{ getSafe(() => item.attributes.name, '') }}
          </h2>
          <h4
            :style="getColor('textColor2')"
            :class="artistId && 'clickable'"
            @click="() => $router.push({ name: 'artist', params: { id: artistId } })"
          >
            {{ getSafe(() => item.attributes.artistName, '') }}
          </h4>
          <h5 :style="getColor('textColor3')" v-if="!isPlaylist">
            {{ getSafe(() => item.attributes.releaseDate, '') }}
          </h5>
          <p :style="getColor('textColor4')" v-else class="scrollWrapper">
            {{ getSafe(() => item.attributes.description.standard) }}
          </p>
        </div>
        <div class="album-buttons">
          <div
            :style="gradientBackground()"
            @click="playAlbumOrPlaylist(item.attributes.playParams)"
            class="button "
          >
            <font-awesome-icon icon="play" size="1x" /> <span>Play</span>
          </div>
          <div
            v-if="$route.meta.album && $route.meta.isLibrary"
            @click="routeToAlbum(item.attributes.artistName, item.attributes.name)"
            class="button "
          >
            <font-awesome-icon icon="record-vinyl" size="1x" /> <span>Complete Album</span>
          </div>
        </div>
      </div>
    </div>
    <div class="song-list">
      <song
        v-for="(track, index) in item.relationships.tracks.data"
        :track="track"
        :index="index"
        :playItems="item.relationships.tracks.data"
        :playParams="item.attributes.playParams"
        :key="track.id"
      />
    </div>
  </div>
</template>

<script>
import Song from './Song';
import helpers from '../store/helpers';
import musicMixin from '@/components/Mixins/musicMixin';
import { mapActions, mapGetters, mapState } from 'vuex';
import playMixin from '@/components/Mixins/playMixin';
export default {
  name: 'songs-list',
  components: { Song },
  props: {
    item: Object,
  },
  mixins: [musicMixin, playMixin],
  methods: {
    getSafe: helpers.getSafe,
    getUrl: helpers.getUrl,
    ...mapActions('player', {
      togglePlayPause: 'togglePlayPause',
    }),
    getColor(type) {
      return {
        color: `#${this.getSafe(() => this.item.attributes.artwork[type], 'white')} !important`,
      };
    },
    getBackground() {
      return {
        backgroundColor: `#${this.getSafe(
          () => this.item.attributes.artwork.bgColor,
          '#282828',
        )} !important`,
      };
    },
    gradientBackground() {
      return {
        background:
          'linear-gradient(45deg,rgba(242, 127, 156, 1) 0%,rgba(255, 117, 151, 1) 46%,' +
          `#${this.getSafe(() => this.item.attributes.artwork.bgColor, '#282828')} 100%) `,
      };
    },
  },
  computed: {
    isPlaylist() {
      return this.item.attributes.playParams.kind === 'playlist';
    },
    ...mapGetters('player', {
      getNowPlayingStatus: 'getNowPlayingStatus',
    }),
    ...mapState('player', {
      isPlaying: (state) => state.isPlaying,
    }),
    isCurrentlyPlaying() {
      return this.item.attributes.name === this.getNowPlayingStatus.albumName;
    },
    artistId() {
      return this.getSafe(() => this.item.relationships.artists.data[0].id, false);
    },
  },
};
</script>

<style scoped>
.button {
  min-width: 100px;
  width: max-content;
  margin: 1em 0 0 10px;
  padding: 10px 10px;
}
span {
  margin: 0 0 0 6px;
  display: inline-block;
}
</style>
