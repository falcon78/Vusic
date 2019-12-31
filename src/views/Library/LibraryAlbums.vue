<template>
  <div class="albums-page scrollWrapper">
    <full-page-loader v-if="!albums.length" />
    <artwork-and-title
      v-else
      class="margin"
      v-for="album in albums"
      :item="album"
      :key="album.id"
      :type="'library-album'"
    />
  </div>
</template>

<script>
import helpers from '../../store/helpers';
import ArtworkAndTitle from '@/components/ArtworkAndTitle.vue';
import FullPageLoader from '@/components/FullPageLoader';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'albums',
  data() {
    return {};
  },
  components: {
    FullPageLoader,
    ArtworkAndTitle,
  },
  methods: {
    ...mapActions('myLibrary', {
      fetchAllItems: 'fetchAllItems',
    }),
  },
  computed: {
    ...mapState('myLibrary', {
      albums: (state) => state.albums,
    }),
  },
  async created() {
    try {
      await this.fetchAllItems({
        refresh: false,
        item: 'albums',
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
