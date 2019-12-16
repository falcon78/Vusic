<template>
  <div class="scrollWrapper">
    <div class="artists-name-container scrollWrapper">
      <full-page-loader v-if="!artists.length" />
      <artist-profile v-else v-for="artist in artists" :artist="artist" :key="artist.id" />
    </div>
    <router-view />
  </div>
</template>

<script>
import ArtistProfile from '@/components/ArtistProfile';
import FullPageLoader from '@/components/FullPageLoader';
export default {
  name: 'Artists',
  components: { FullPageLoader, ArtistProfile },
  data() {
    return {
      artists: [],
    };
  },
  methods: {
    async fetchAllArtists() {
      const music = MusicKit.getInstance().api.library;
      let fetchingData = true;
      let offset = 0;
      while (fetchingData) {
        try {
          const artists = await music.artists(null, { limit: 100, offset });
          offset += 100;
          fetchingData = !!artists.length;
          this.artists.push(...artists);
        } catch (e) {
        }
      }
    },
  },
  created() {
    this.fetchAllArtists();
  },
};
</script>

<style scoped />
