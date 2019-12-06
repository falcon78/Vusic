<template>
  <div class="albums-page scrollWrapper">
    <thumbnail-and-title
      class="margin"
      v-for="playlist in playlists"
      :key="playlist.id"
      :id="playlist.id"
      :size="'small'"
      :title="playlist.attributes.name"
      :artwork="getUrl(playlist.attributes.artwork, 100)"
      :play-params="playlist.attributes.playParams"
      :url="playlist.href"
      :type="'playlist'"
      :to="''"
    />
  </div>
</template>
<!--
<template>
  <div class="albums-page scrollWrapper">
    <thumbnail-and-title
      class="margin"
      v-for="album in fetchedAlbums"
      :key="album.id"
      :id="album.id"
      :size="'small'"
      :artist="album.attributes.artistName"
      :title="album.attributes.name"
      :artwork="getUrl(album.attributes.artwork, 100)"
      :type="getType(album.type)"
    />
  </div>
</template>
-->

<script>
  import helpers from '../../store/helpers';
  import ThumbnailAndTitle from '@/components/ThumbnailAndTitle.vue';

  export default {
    name: 'library-playlist',
    data() {
      return {
        playlists: [],
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
        .api.library.playlists(null, { limit: 100 })
        .then((playlists) => (this.playlists = playlists));
    },
  };
</script>
