<template>
  <div class="albums-page scrollWrapper">
    <thumbnail-and-title
      class="margin"
      v-for="album in albums"
      :key="album.id"
      :id="album.id"
      :size="'small'"
      :artist="album.attributes.artistName"
      :title="album.attributes.name"
      :artwork="getUrl(album.attributes.artwork, 100)"
      :type="getType(album.type)"
      :play-params="album.attributes.playParams"
    />
  </div>
</template>

<script>
import helpers from '../../store/helpers';
import ThumbnailAndTitle from '@/components/ThumbnailAndTitle.vue';

export default {
  name: 'albums-page',
  data() {
    return {
      albums: [],
    };
  },
  components: {
    ThumbnailAndTitle,
  },
  methods: {
    getUrl: helpers.getUrl,
    getType: helpers.getType,
  },
  mounted() {
    MusicKit.getInstance()
      .api.library.albums(null, { limit: 100 })
      .then((albums) => (this.albums = albums));
  },
};
</script>
