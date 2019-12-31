<template>
  <div class="scrollWrapper">
    <full-page-loader v-if="!items.length" />
    <artwork-and-title
      v-else
      v-for="item in items"
      :item="item"
      :key="item.id"
      type="library-album"
    />
  </div>
</template>

<script>
import ArtworkAndTitle from '@/components/ArtworkAndTitle';
import FullPageLoader from '@/components/FullPageLoader';
export default {
  name: 'MultipleAlbumItems',
  components: { FullPageLoader, ArtworkAndTitle },
  data() {
    return {
      items: [],
      id: this.$route.params.id,
    };
  },
  methods: {
    getLibraryArtistAlbums() {
      try {
        MusicKit.getInstance()
          .api.library.artist(this.id, { include: 'albums' })
          .then((albums) => (this.items = albums.relationships.albums.data));
      } catch (e) {
        this.$swal({
          type: 'error',
          title: e.name,
          text: e.message,
        });
      }
    },
  },
  watch: {
    '$route.params.id': function change() {
      this.items = [];
      this.id = this.$route.params.id;
      this.getLibraryArtistAlbums();
    },
  },
  created() {
    this.getLibraryArtistAlbums();
  },
};
</script>
