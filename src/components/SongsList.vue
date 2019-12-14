<template>
  <div>
    <div class="album-details scrollWrapper">
      <img :src="getUrl(item.attributes.artwork, 200)" alt="artwork of currently viewing item" />
      <div class="album-metadata">
        <h1>{{ item.attributes.name }}</h1>
        <h3>{{ item.attributes.artistName }}</h3>
        <h4 v-if="!isPlaylist">
          {{ getSafe(() => item.relationships.tracks.data[0].attributes.releaseDate) }}
        </h4>
        <font-awesome-icon icon="user-secret" size="2x" />
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
export default {
  name: 'songs-list',
  components: { Song },
  props: {
    item: Object,
  },
  methods: {
    getSafe: helpers.getSafe,
    getUrl: helpers.getUrl,
  },
  computed: {
    isPlaylist() {
      return this.item.attributes.playParams.kind === 'playlist';
    },
  },
};
</script>
