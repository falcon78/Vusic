<template>
  <div class="scrollWrapper">
    <full-page-loader v-if="!playlist" />
    <songs-list v-if="playlist" :item="playlist" />
  </div>
</template>

<script>
import SongsList from '@/components/SongsList';
import FullPageLoader from '@/components/FullPageLoader';
import getSafeMixin from './Mixins/getSafeMixin';
export default {
  name: 'LibraryPlaylist',
  components: {
    SongsList,
    FullPageLoader,
  },
  mixins: [getSafeMixin],
  data() {
    return {
      id: this.$route.params.id,
      playlist: null,
      isLibrary: this.getSafe(() => this.$route.name.match(/library/gi)[0]),
    };
  },
  methods: {
    getPlaylistInfo() {
      const music = this.isLibrary
        ? MusicKit.getInstance().api.library
        : MusicKit.getInstance().api;
      music.playlist(this.id).then((playlist) => (this.playlist = playlist));
    },
  },
  mounted() {
    this.getPlaylistInfo();
  },
};
</script>
