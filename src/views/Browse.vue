<template>
  <div class="scrollWrapper">
    <h2 class="browse-page-category">{{ songs.name }}</h2>
    <div class="top-songs scrollWrapper">
      <song
        v-for="(song, index) in songs.data"
        :track="song"
        :index="index"
        :play-params="{ items: songs.data }"
        :key="song.id"
      />
    </div>
    <h2 class="browse-page-category">{{ albums.name }}</h2>
    <div class="albums-list">
      <full-page-loader v-if="!albums" />
      <artwork-and-title
        v-else
        class="albums-margin"
        v-for="album in albums.data"
        :item="album"
        :key="album.id"
        :type="'album'"
      />
    </div>

    <h2 class="browse-page-category">{{ playlists.name }}</h2>
    <div class="albums-list">
      <artwork-and-title
        class="albums-margin"
        v-for="playlist in playlists.data"
        :item="playlist"
        :key="playlist.id"
        :type="'playlist'"
      />
    </div>
  </div>
</template>

<script>
import Song from '../components/Song';
import ArtworkAndTitle from '../components/ArtworkAndTitle';
import FullPageLoader from '../components/FullPageLoader';

export default {
  name: 'Browse',
  components: { FullPageLoader, ArtworkAndTitle, Song },
  data() {
    return {
      songs: null,
      albums: null,
      playlists: null,
    };
  },
  methods: {
    fetchTopCharts() {
      MusicKit.getInstance()
        .api.charts(['songs', 'albums', 'playlists'], { limit: 40 })
        .then((charts) => {
          this.albums = charts.albums.pop();
          this.playlists = charts.playlists.pop();
          this.songs = charts.songs.pop();
        });
    },
  },
  created() {
    this.fetchTopCharts();
  },
};
</script>
