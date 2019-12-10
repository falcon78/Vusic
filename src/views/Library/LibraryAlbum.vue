<template>
  <div>
    <Album
      v-if="album"
      :id="album.id"
      :type="album.type"
      :artwork="getUrl(album.attributes.artwork, 100)"
      :title="album.attributes.name"
      :artistName="album.attributes.artistName"
      :releaseDate="getSafe(() => album.relationships.tracks.data[0].attributes.releaseDate)"
      :playParams="album.attributes.playParams"
      :songs="album.relationships.tracks.data"
    />
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
import Album from '@/components/Album';
import helpers from '@/store/helpers';
export default {
  name: 'LibraryAlbum',
  components: {
    Album,
  },
  data() {
    return {
      id: this.$route.params.id,
      album: null,
    };
  },
  methods: {
    getAlbumInfo() {
      MusicKit.getInstance()
        .api.library.album(this.id)
        .then((album) => (this.album = album));
    },
    getSafe: helpers.getSafe,
    getUrl: helpers.getUrl,
  },
  mounted() {
    this.getAlbumInfo();
  },
};
</script>
