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
      :artwork="setImageSize(album.artwork, 150, 150)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ThumbnailAndTitle from '@/components/ThumbnailAndTitle.vue';

export default {
  name: 'albums-page',
  components: {
    ThumbnailAndTitle,
  },
  methods: {
    setImageSize(url, width, height) {
      return url.replace('{w}', width).replace('{h}', height);
    },
  },
  computed: {
    ...mapGetters('music', {
      albums: 'getLibraryAlbums',
    }),
  },
};
</script>
