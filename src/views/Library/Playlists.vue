<template>
  <div class="albums-page scrollWrapper">
    <full-page-loader v-if="!playlists.length" />
    <thumbnail-and-title
      class="margin"
      v-for="playlist in playlists"
      :key="playlist.id"
      :id="playlist.id"
      :size="'small'"
      :title="playlist.attributes.name"
      :artwork="getUrl(playlist.attributes.artwork, 100)"
      :play-params="playlist.attributes.playParams"
      :url="playlist.href"
      :type="'playlist'"
      :to="''"
    />
  </div>
</template>

<script>
import helpers from '../../store/helpers';
import ThumbnailAndTitle from '@/components/ThumbnailAndTitle.vue';
import FullPageLoader from '@/components/Player/FullPageLoader';

export default {
  name: 'library-playlist',
  data() {
    return {
      playlists: [],
    };
  },
  components: {
    FullPageLoader,
    ThumbnailAndTitle,
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
