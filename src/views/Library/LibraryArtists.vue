<template>
  <div class="scrollWrapper library-artist-container">
    <div class="artists-name-container scrollWrapper">
      <full-page-loader v-if="!artists.length" />
      <artist-profile v-else v-for="artist in artists" :artist="artist" :key="artist.id" />
    </div>
    <router-view class="library-artist-items" />
  </div>
</template>

<script>
import ArtistProfile from '@/components/LibraryArtistProfile';
import FullPageLoader from '@/components/FullPageLoader';
export default {
  name: 'Artists',
  components: { FullPageLoader, ArtistProfile },
  data() {
    return {
      artists: [],
      selected: this.$route.params.id,
    };
  },
  methods: {
    async fetchAllArtists() {
      const music = MusicKit.getInstance().api.library;
      let fetchingData = true;
      let offset = 0;
      // to prevent infinite loop just in case
      let loopCount = 0;
      while (fetchingData && loopCount < 500) {
        try {
          const artists = await music.artists(null, { limit: 100, offset });
          offset += 100;
          fetchingData = artists.length > 0;
          this.artists.push(...artists);
          loopCount++;
        } catch (e) {
          this.$swal({
            type: 'error',
            title: 'An Error Occurred...',
            text: e.message,
          });
        }
      }
    },
  },
  async mounted() {
    await this.fetchAllArtists();
  },
};
</script>

<style scoped />
