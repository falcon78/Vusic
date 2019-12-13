<template>
  <div class="scrollWrapper">
    <full-page-loader v-if="!playlist" />
    <album-playlist-songs v-if="playlist" :item="playlist" />
  </div>
</template>

<script>
import AlbumPlaylistSongs from '@/components/AlbumPlaylistSongs';
import FullPageLoader from '@/components/Player/FullPageLoader';
export default {
  name: 'LibraryPlaylist',
  components: {
    AlbumPlaylistSongs,
    FullPageLoader,
  },
  data() {
    return {
      id: this.$route.params.id,
      playlist: null,
    };
  },
  methods: {
    getPlaylistInfo() {
      MusicKit.getInstance()
        .api.library.playlist(this.id)
        .then((playlist) => (this.playlist = playlist));
    },
  },
  mounted() {
    this.getPlaylistInfo();
  },
};
</script>
