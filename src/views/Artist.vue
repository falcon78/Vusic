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
      MusicKit.getInstance()
        .api.artist(this.$route.params.id)
        .then((res) => {
          this.artistInfo = res;
        });
    },
    fetchArtistItems() {
      const music = MusicKit.getInstance().api;
      const id = this.$route.params.id;
      music.artist(id, { include: 'songs' }).then((items) => {
        this.songs = items;
      });
      music.artist(id, { include: 'albums' }).then((items) => {
        this.albums = items;
      });
      music.artist(id, { include: 'playlists' }).then((items) => {
        this.playlists = items;
      });
    },
  },
  created() {
    this.fetchArtistInfo();
    this.fetchArtistItems();
  },
};
</script>
