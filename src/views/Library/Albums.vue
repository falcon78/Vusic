<template>
  <div class="albums-page scrollWrapper">
    <full-page-loader v-if="!albums.length" />
    <artwork-and-title
      v-else
      class="margin"
      v-for="album in albums"
      :item="album"
      :key="album.id"
      :id="album.id"
      :size="'small'"
      :artist="album.attributes.artistName"
      :title="album.attributes.name"
      :artwork="getUrl(album.attributes.artwork, 100)"
      :type="'library-album'"
      :play-params="album.attributes.playParams"
    />
  </div>
</template>

<script>
import helpers from '../../store/helpers';
import ArtworkAndTitle from '@/components/ArtworkAndTitle.vue';
import FullPageLoader from '@/components/Player/FullPageLoader';

export default {
  name: 'albums',
  data() {
    return {
      albums: [],
    };
  },
  components: {
    FullPageLoader,
    ArtworkAndTitle,
  },
  methods: {
    getUrl: helpers.getUrl,
  },
  mounted() {
    MusicKit.getInstance()
      .api.library.albums(null, { limit: 100 })
      .then((albums) => (this.albums = albums));
  },
};
</script>
