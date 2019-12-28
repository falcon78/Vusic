<template>
  <div class="scrollWrapper">
    <full-page-loader v-if="!album" />
    <songs-list v-if="album" :item="album" />
  </div>
</template>

<script>
import SongsList from '@/components/SongsList';
import FullPageLoader from '@/components/FullPageLoader';
import helpers from '@/store/helpers';

export default {
  name: 'album',
  components: {
    SongsList,
    FullPageLoader,
  },
  data() {
    return {
      id: this.$route.params.id,
      album: null,
      library: this.$route.meta.isLibrary,
    };
  },
  methods: {
    getApi: helpers.getApi,
    getAlbumInfo() {
      this.getApi(this.library)
        .album(this.id)
        .then((album) => (this.album = album));
    },
  },
  mounted() {
    this.getAlbumInfo();
  },
};
</script>
