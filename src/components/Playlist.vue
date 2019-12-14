<template>
  <div class="scrollWrapper">
    <full-page-loader v-if="!playlist" />
    <songs-list v-if="playlist" :item="playlist" />
  </div>
</template>

<script>
import SongsList from '@/components/SongsList';
import FullPageLoader from '@/components/FullPageLoader';
export default {
  name: 'LibraryPlaylist',
  components: {
    SongsList,
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
