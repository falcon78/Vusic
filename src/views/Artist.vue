<template>
  <div class="full-div scrollWrapper">
    <h2>{{ artistInfo.attributes.name }}</h2>
    <songs-albums-playlists
      :albums="{ name: 'Albums', data: albums }"
      :songs="{ name: 'Songs', data: songs }"
      :playlists="{ name: 'Playlists', data: playlists }"
    />
  </div>
</template>

<script>
import SongsAlbumsPlaylists from '@/components/SongsAlbumsPlaylists';
export default {
  name: 'Artist',
  components: { SongsAlbumsPlaylists },
  data() {
    return {
      artistInfo: [],
      songs: [],
      albums: [],
      playlists: [],
    };
  },
  watch: {
    '$route.params.id': function() {
      this.fetchArtistInfo();
      this.fetchArtistItems();
    },
  },
  methods: {
    fetchArtistInfo() {
      try {
        MusicKit.getInstance()
          .api.artist(this.$route.params.id)
          .then((res) => {
            this.artistInfo = res;
          });
      } catch (e) {
        this.$swal({
          type: 'error',
          title: e.name,
          text: e.message,
        });
      }
    },
    async fetchArtistItems() {
      try {
        const music = MusicKit.getInstance().api;
        const id = this.$route.params.id;
        this.songs = await music.artist(id, { include: 'songs' });
        this.albums = await music.artist(id, { include: 'albums' });
        this.playlists = await music.artist(id, { include: 'playlists' });
      } catch (e) {
        this.$swal({
          type: 'error',
          title: e.name,
          text: e.message,
        });
      }
    },
  },
  created() {
    this.fetchArtistInfo();
    this.fetchArtistItems();
  },
};
</script>
