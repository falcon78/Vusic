<template>
  <div class="album-playlist-items scrollWrapper">
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
      this.getItems();
    },
  },
  data() {
    return {
      item: null,
      isLibrary: this.getSafe(() => this.$route.meta.isLibrary, false),
    };
  },
  methods: {
    async getItems() {
      try {
        const id = this.$route.params.id;
        const music = this.isLibrary
          ? MusicKit.getInstance().api.library
          : MusicKit.getInstance().api;
        this.item = await music[this.$route.meta.album ? 'album' : 'playlist'](id);
      } catch (e) {
        this.$swal({
          type: 'error',
          title: e.name,
          text: e.message,
        });
      }
    },
  },
  mounted() {
    this.getItems();
  },
};
</script>
