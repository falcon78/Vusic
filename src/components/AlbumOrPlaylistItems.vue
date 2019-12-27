<template>
  <div class="scrollWrapper">
    <full-page-loader v-if="!item" />
    <songs-list v-if="item" :item="item" />
  </div>
</template>

<script>
import SongsList from '@/components/SongsList';
import FullPageLoader from '@/components/FullPageLoader';
import getSafeMixin from './Mixins/getSafeMixin';
import musicMixin from '@/components/Mixins/musicMixin';

export default {
  name: 'album-or-playlist-items',
  props: {
    type: String,
  },
  components: {
    SongsList,
    FullPageLoader,
  },
  mixins: [getSafeMixin, musicMixin],
  watch: {
    '$route.params.id': function() {
      this.$route.meta.album ? this.getAlbumInfo() : this.getPlaylistInfo();
    },
  },
  data() {
    return {
      id: this.$route.params.id,
      item: null,
      isLibrary: this.getSafe(() => this.$route.meta.isLibrary, false),
    };
  },
  methods: {
    getPlaylistInfo() {
      this.getApi(this.isLibrary)
        .playlist(this.id)
        .then((playlist) => (this.item = playlist));
    },
    getAlbumInfo() {
      this.getApi(this.isLibrary)
        .album(this.id)
        .then((album) => (this.item = album));
    },
  },
  mounted() {
    this.$route.meta.album ? this.getAlbumInfo() : this.getPlaylistInfo();
  },
};
</script>
