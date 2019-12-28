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
      console.log(this.$route.params.id);
      // this.$route.meta.album ? this.getAlbumInfo() : this.getPlaylistInfo();
      this.item = null
      this.getItems();
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
        .then((playlist) => {
          this.item = { ...playlist };
          console.log(playlist);
        });
    },
    async getAlbumInfo() {
      const album = await this.getApi(this.isLibrary).album(this.id);
      this.item = { ...album };
    },
    async getItems() {
      const music = this.isLibrary
        ? MusicKit.getInstance().api.library
        : MusicKit.getInstance().api;
      this.item = await music[this.$route.meta.album ? 'album' : 'playlist'](this.id);
    },
  },
  mounted() {
    console.log('ooooooo');
    //this.$route.meta.album ? this.getAlbumInfo() : this.getPlaylistInfo();
    this.getItems();
  },
};
</script>
