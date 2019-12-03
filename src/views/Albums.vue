<template>
  <div class="albums-page scrollWrapper">
    <thumbnail-and-title
      class="margin"
      v-for="album in albums"
      :key="album.id"
      :id="album.id"
      :size="'small'"
      :artist="album.artist"
      :title="album.title"
      :artwork="album.artwork"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ThumbnailAndTitle from '@/components/ThumbnailAndTitle.vue';

export default {
  name: 'albums-page',
  components: {
    ThumbnailAndTitle,
  },
  methods: {
    ...mapActions('music', {
      getAlbums: 'getAlbums',
    }),
  },
  computed: {
    ...mapGetters('music', {
      albums: 'getLibraryAlbums',
    }),
  },
  mounted() {
    this.getAlbums();
  },
};
</script>
