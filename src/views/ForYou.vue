<template>
  <full-page-loader v-if="loading" />
  <div v-else class="scrollWrapper for-you">
    <h2 class="browse-page-category">Recently Played</h2>
    <div class="albums-page">
      <artwork-and-title
        class="albums-margin"
        v-for="item in recentlyPlayed"
        :item="item"
        :type="item.type.slice(0, -1)"
        :key="item.id"
      />
    </div>

    <h2 class="browse-page-category">Heavy Rotation</h2>
    <div class="albums-page">
      <artwork-and-title
        class="albums-margin"
        v-for="item in heavyRotation"
        :item="item"
        :type="item.type.slice(0, -1)"
        :key="item.id"
      />
    </div>
    <div v-for="items in recommendations" :key="items.id">
      <h2 class="browse-page-category">{{ items.attributes.title.stringForDisplay }}</h2>
      <div class="albums-page">
        <artwork-and-title
          class="albums-margin"
          v-for="item in items.relationships.contents.data"
          :key="item.id"
          :item="item"
          :type="item.type.slice(0, -1)"
        />
      </div>
    </div>
    <div class="padding-div"></div>
  </div>
</template>

<script>
import ArtworkAndTitle from '@/components/ArtworkAndTitle';
import FullPageLoader from '@/components/FullPageLoader';
export default {
  name: 'ForYou',
  components: { FullPageLoader, ArtworkAndTitle },
  data() {
    return {
      loading: true,
      heavyRotation: null,
      recentlyPlayed: null,
      recommendations: null,
    };
  },
  methods: {
    getAll() {
      const music = MusicKit.getInstance().api;
      music
        .historyHeavyRotation()
        .then((items) => (this.heavyRotation = items))
        .then(() => music.recentPlayed().then((items) => (this.recentlyPlayed = items)))
        .then(() => music.recommendations().then((items) => (this.recommendations = items)))
        .then(() => (this.loading = false))
        .catch((e) => {
          this.$swal({
            type: 'error',
            title: e.name,
            text: e.message,
          });
        });
    },
  },
  created() {
    this.getAll();
  },
};
</script>

<style scoped>
.padding-div {
  padding: 2em;
}
</style>
