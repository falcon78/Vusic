<template>
  <div class="albums-page scrollWrapper">
    <full-page-loader v-if="!albums.length" />
    <artwork-and-title
      v-else
      class="margin"
      v-for="album in albums"
      :item="album"
      :key="album.id"
      :size="'small'"
      :type="'library-album'"
    />
  </div>
</template>

<script>
import helpers from '../../store/helpers';
import ArtworkAndTitle from '@/components/ArtworkAndTitle.vue';
import FullPageLoader from '@/components/FullPageLoader';

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
