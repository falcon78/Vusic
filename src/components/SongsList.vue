<template>
  <div>
    <div class="album-details scrollWrapper">
      <img :src="getUrl(item.attributes.artwork, 200)" alt="artwork of currently viewing item" />
      <div class="album-metadata">
        <div class="albums-attributes">
          <h1>{{ item.attributes.name }}</h1>
          <h3>{{ item.attributes.artistName }}</h3>
          <h4 v-if="!isPlaylist">
            {{ getSafe(() => item.relationships.tracks.data[0].attributes.releaseDate) }}
          </h4>
        </div>
        <div class="album-buttons">
          <div
            v-if="!isCurrentlyPlaying"
            @click="playSongFromItems(item.attributes.playParams, 0)"
            class="button "
          >
            <font-awesome-icon icon="play" size="1x" /> Play
          </div>
          <div v-else>
            <div v-if="isPlaying" @click="togglePlayPause" class="button ">
              <font-awesome-icon icon="pause" size="1x" /> Pause
            </div>
            <div v-else @click="togglePlayPause" class="button ">
              <font-awesome-icon icon="play" size="1x" /> Play
            </div>
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
      return (
        this.item.attributes.name === this.getNowPlayingStatus.albumName &&
        this.item.attributes.artistName === this.getNowPlayingStatus.artistName
      );
    },
  },
};
</script>
