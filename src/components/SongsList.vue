<template>
  <div>
    <div class="album-details scrollWrapper">
      <img :src="getUrl(item.attributes.artwork, 200)" alt="artwork of currently viewing item" />
      <div class="album-metadata">
        <div class="albums-attributes">
          <h2>{{ item.attributes.name }}</h2>
          <h4>{{ item.attributes.artistName }}</h4>
          <h5 v-if="!isPlaylist">
            {{ getSafe(() => item.relationships.tracks.data[0].attributes.releaseDate) }}
          </h5>
          <p v-else class="scrollWrapper">
            {{ getSafe(() => item.attributes.description.standard) }}
          </p>
        </div>
        <div class="album-buttons">
          <div @click="playSongFromItems(item.attributes.playParams, 0)" class="button ">
            <font-awesome-icon icon="play" size="1x" /> <span>Play</span>
          </div>
        </div>
      </div>
    </div>
    <div class="song-list">
      <song
        v-for="(track, index) in item.relationships.tracks.data"
        :track="track"
        :index="index"
        :play-params="item.attributes.playParams"
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
export default {
  name: 'songs-list',
  components: { Song },
  props: {
    item: Object,
  },
  mixins: [musicMixin],
  methods: {
    getSafe: helpers.getSafe,
    getUrl: helpers.getUrl,
    ...mapActions('player', {
      togglePlayPause: 'togglePlayPause',
    }),
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
  },
};
</script>

<style scoped>
.button {
  width: 100px;
  margin-top: 1em;
}
span {
  margin: 0 0 0 6px;
  display: inline-block;
}
</style>
