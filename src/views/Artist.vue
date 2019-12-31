<template>
  <div class="full-div scrollWrapper">
    <div style="background: rgba(40,40,40,0.31); margin: 0; padding: 1em;">
      <h2 class="browse-page-category" style="color: rgb(255,117,151)">
        {{ artistInfo.attributes.name }}
      </h2>
    </div>
    <songs-albums-playlists
      :albums="{ name: 'Albums', data: albums }"
      :songs="{ name: 'Songs', data: songs }"
      :playlists="{ name: 'Playlists', data: playlists }"
    />
  </div>
</template>

<script>
import SongsAlbumsPlaylists from '@/components/SongsAlbumsPlaylists';
import swalMixin from '@/components/Mixins/swalMixin';
export default {
  name: 'Artist',
  components: { SongsAlbumsPlaylists },
  mixins: [swalMixin],
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
        this.swal('error', e.name, e.message);
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
        this.swal('error', e.name, e.message);
      }
    },
  },
  created() {
    this.fetchArtistInfo();
    this.fetchArtistItems();
  },
};
</script>
