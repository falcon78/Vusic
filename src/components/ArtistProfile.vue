<template>
  <div class="artist-profile" @click="routeToArtist">
    <img :src="getUrl(artist.attributes.artwork, 50)" :alt="`image of ${artist.attributes.name}`" />
    <p :title="artist.attributes.name">{{ artist.attributes.name }}</p>
  </div>
</template>

<script>
import getSafeMixin from '@/components/Mixins/getSafeMixin';

export default {
  name: 'artist-profile',
  props: {
    artist: Object,
  },
  mixins: [getSafeMixin],
  methods: {
    routeToArtist() {
      const route = this.$route.meta.isLibrary ? 'library-artist-items' : 'artist';
      console.log(this.artist);
      this.$router.push({ name: route, params: { id: this.artist.id } });
    },
  },
};
</script>
