<template>
  <div class="albums-page scrollWrapper">
    <full-page-loader v-if="!playlists.length" />
    <artwork-and-title
      class="albums-margin"
      v-for="playlist in playlists"
      :key="playlist.id"
      :item="playlist"
      :type="'library-playlist'"
    />
  </div>
</template>

<script>
import helpers from '../../store/helpers';
import ArtworkAndTitle from '@/components/ArtworkAndTitle.vue';
import FullPageLoader from '@/components/FullPageLoader';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'library-playlist',
  data() {
    return {};
  },
  components: {
    FullPageLoader,
    ArtworkAndTitle,
  },
  methods: {
    getUrl: helpers.getUrl,
    ...mapActions('myLibrary', {
      fetchAllItems: 'fetchAllItems',
    }),
  },
  computed: {
    ...mapState('myLibrary', {
      playlists: (state) => state.playlists,
    }),
  },
  async created() {
    try {
      await this.fetchAllItems({
        refresh: false,
        item: 'playlists',
        options: null,
        library: true,
      });
    } catch (e) {
      this.$swal({
        type: 'error',
        title: e.name,
        text: e.message,
      });
    }
  },
};
</script>
