<template>
  <div class="library-songs scrollWrapper">
    <full-page-loader v-if="!songs.length" />
    <div v-else class="song-lists">
      <div class="songs-length">Total Songs Loaded : {{ songs.length }}</div>
      <song
        v-for="(song, index) in songs"
        :track="song"
        :index="index"
        :play-params="{ items: songs }"
        :play-items="songs"
        :key="song.id"
      />
    </div>
  </div>
</template>

<script>
import Song from '@/components/Song';
import FullPageLoader from '@/components/FullPageLoader';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Songs',
  components: { FullPageLoader, Song },
  data() {
    return {
      fetchingData: true,
    };
  },
  created() {
    this.$swal({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      type: 'info',
      title: 'Loading library songs...',
    });
    this.fetchAllItems({
      refresh: false,
      item: 'songs',
      options: null,
      library: true,
    })
      .catch(() => {})
      .finally(() => {
        this.$swal.close();
      });
  },
  methods: {
    ...mapActions('myLibrary', {
      fetchAllItems: 'fetchAllItems',
    }),
  },
  computed: {
    ...mapState('myLibrary', {
      songs: (state) => state.songs,
    }),
  },
};
</script>
