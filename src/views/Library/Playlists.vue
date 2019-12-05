<template>
  <div class="albums-page scrollWrapper">
    <thumbnail-and-title
      class="margin"
      v-for="playlist in playlists"
      :key="playlist.id"
      :id="playlist.id"
      :size="'small'"
      :title="playlist.attributes.name"
      :artwork="formatUrl(playlist.attributes.artwork)"
      :url="playlist.href"
      :type="'playlist'"
      :to="''"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ThumbnailAndTitle from '@/components/ThumbnailAndTitle.vue';
import helpers from '../../store/helpers';

export default {
  name: 'albums-page',
  components: {
    ThumbnailAndTitle,
  },
  methods: {
    ...mapActions('myLibrary', {
      getPlaylists: 'getPlaylists',
    }),
    formatUrl(url) {
      return helpers.getSafe(() => MusicKit.formatArtworkURL(url, 100, 100), helpers.fakeArtwork);
    },
  },
  computed: {
    ...mapState('myLibrary', {
      playlists: (state) => state.playlists,
    }),
  },
  mounted() {
    this.getPlaylists();
  },
};
</script>
