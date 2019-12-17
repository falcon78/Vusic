<template>
  <full-page-loader v-if="loading" />
  <songs-albums-playlists v-else :songs="songs" :albums="albums" :playlists="playlists" />
</template>

<script>
import FullPageLoader from '../components/FullPageLoader';
import SongsAlbumsPlaylists from '@/components/SongsAlbumsPlaylists';

export default {
  name: 'Browse',
  components: { SongsAlbumsPlaylists, FullPageLoader },
  data() {
    return {
      songs: null,
      albums: null,
      playlists: null,
      loading: true,
    };
  },
  methods: {
    fetchTopCharts() {
      MusicKit.getInstance()
        .api.charts(['songs', 'albums', 'playlists'], { limit: 40 })
        .then((charts) => {
          this.albums = charts.albums.pop();
          this.playlists = charts.playlists.pop();
          this.songs = charts.songs.pop();
          this.loading = false;
        });
    },
  },
  created() {
    this.fetchTopCharts();
  },
};
</script>
