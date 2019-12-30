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
            @click="() => artistId && $router.push({ name: 'artist', params: { id: artistId } })"
          >
            {{ getSafe(() => item.attributes.artistName, '') }}
          </h4>
          <h5 :style="getColor('textColor3')" v-if="!isPlaylist">
            {{ getSafe(() => item.attributes.releaseDate, '') }}
          </h5>
          <p :style="getColor('textColor4')" v-else class="scrollWrapper">
            {{ getSafe(() => item.attributes.description.standard) }}
          </p>
          <h4
            v-if="$route.meta.album && $route.meta.isLibrary"
            class="clickable"
            @click="routeToAlbum(item.attributes.artistName, item.attributes.name, trackId)"
            style="color: #ff7597"
          >
            Show Complete Album
          </h4>
        </div>
        <div class="album-buttons">
          <div :style="gradientBackground()" @click="playItems()" class="button ">
            <font-awesome-icon icon="play" size="1x" />
            <span>Play</span>
          </div>

          <div :style="gradientBackground()" @click="shuffleItems()" class="button">
            <font-awesome-icon icon="play" size="1x" />
            <span>Shuffle</span>
          </div>

          <div @click="optionsVisible = true" class="options-button-album">
            <div :style="gradientBackground()" class="button small-button">
              <font-awesome-icon icon="ellipsis-h" size="1x" />
            </div>
            <options-menu
              :position="'bottom: 0; right: 0;'"
              v-if="optionsVisible"
              @mouse:leave="optionsVisible = false"
              @play:next="playNext({ items: item.relationships.tracks.data })"
              @play:later="playLater({ items: item.relationships.tracks.data })"
              @add:library="addToLibrary([item.id], item.attributes.name)"
              @love="rateItem(item, 1)"
              @dislike="rateItem(item, -1)"
            />
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
import OptionsMenu from '@/assets/Components/OptionsMenu';

export default {
  name: 'songs-list',
  components: { OptionsMenu, Song },
  props: {
    item: Object,
  },
  data() {
    return {
      optionsVisible: false,
    };
  },
  mixins: [musicMixin, playMixin],
  methods: {
    getSafe: helpers.getSafe,
    getUrl: helpers.getUrl,
    ...mapActions('player', {
      togglePlayPause: 'togglePlayPause',
      setShuffle: 'setShuffle',
    }),
    async shuffleItems() {
      await this.setShuffle(1);
      this.playAlbumOrPlaylist(this.item.attributes.playParams);
    },
    async playItems() {
      await this.setShuffle(0);
      this.playAlbumOrPlaylist(this.item.attributes.playParams);
    },
    getColor(type) {
      return {
        color: `#${this.getSafe(() => this.item.attributes.artwork[type], 'white')} !important`,
      };
    },
    getBackground() {
      return {
        backgroundColor: `#${this.getSafe(
          () => this.item.attributes.artwork.bgColor,
          '282828',
        )} !important`,
      };
    },
    gradientBackground() {
      return {
        background:
          'linear-gradient(45deg,rgba(242, 127, 156, 1) 0%,rgba(255, 117, 151, 1) 46%,' +
          `#${this.getSafe(() => this.item.attributes.artwork.bgColor, '282828')} 100%) `,
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
    trackId() {
      let id = null;
      if (this.$route.meta.isLibrary) {
        id = this.getSafe(
          () => this.item.relationships.tracks.data[0].attributes.playParams.catalogId,
          0,
        );
      } else {
        id = this.getSafe(() => this.item.relationships.tracks.data[0].attributes.playParams.id, 0);
      }
      return id;
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  min-width: 100px;
  width: max-content;
  margin: 1em 0 0 10px;
  padding: 10px 10px;
  height: 44px;
}

.small-button {
  min-width: 50px;
  width: 50px;
}

span {
  margin: 0 0 0 6px;
  display: inline-block;
}
</style>
