<template>
  <div class="albums-page scrollWrapper">
    <full-page-loader v-if="!playlists.length" />
    <artwork-and-title
      class="margin"
      v-for="playlist in playlists"
      :key="playlist.id"
      :size="'small'"
      :item="playlist"
      :type="'library-playlist'"
    />
  </div>
</template>

<script>
import helpers from '../../store/helpers';
import ArtworkAndTitle from '@/components/ArtworkAndTitle.vue';
import FullPageLoader from '@/components/FullPageLoader';

export default {
  name: 'library-playlist',
  data() {
    return {
      playlists: [],
    };
  },
  components: {
    FullPageLoader,
    ArtworkAndTitle,
  },
  methods: {
    getUrl: helpers.getUrl,
    getType: helpers.getType,
  },
  mounted() {
    MusicKit.getInstance()
      .api.library.playlists(null, { limit: 100 })
      .then((playlists) => (this.playlists = playlists));
  },
};
</script>
