<template>
  <div class="library-songs scrollWrapper">
    <full-page-loader v-if="!songs.length" />
    <song
      v-else
      v-for="(song, index) in songs"
      :track="song"
      :index="index"
      :play-params="{ items: songs }"
      :key="song.id"
    />
  </div>
</template>

<script>
import Song from '@/components/Song';
import FullPageLoader from '@/components/FullPageLoader';
import songFetcherMixin from '@/components/Mixins/SongFetcherMixin';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Songs',
  components: { FullPageLoader, Song },
  mixins: [songFetcherMixin],
  data() {
    return {
      fetchingData: true,
    };
  },
  created() {
    this.fetchAllItems({ refresh: false, item: 'songs', options: null, library: true });
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

<style lang="scss">
.library-songs {
  width: 30%;
  margin: 2em 0;
  box-sizing: border-box;
}
</style>
