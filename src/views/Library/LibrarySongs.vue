<template>
  <div class="library-songs scrollWrapper">
    <full-page-loader v-if="!songs" />
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
export default {
  name: 'Songs',
  components: { FullPageLoader, Song },
  mixins: [songFetcherMixin],
  data() {
    return {
      songs: [],
      fetchingData: true,
    };
  },
  mounted() {
    this.fetchAllItems(true, 'songs', null);
  },
};
</script>

<style lang="scss">
.library-songs {
  margin: 2em 0;
  box-sizing: border-box;
}
</style>
