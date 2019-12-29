<template>
  <div class="scrollWrapper">
    <div v-if="songs && songs.data">
      <h2 class="browse-page-category">{{ songs.name }}</h2>
      <div class="top-songs scrollWrapper">
        <song
          v-for="(song, index) in songs.data"
          :track="song"
          :index="index"
          :play-params="{ items: songs.data }"
          :play-items="songs.data"
          :key="song.id"
        />
      </div>
    </div>

    <div v-if="albums && albums.data">
      <h2 class="browse-page-category">{{ albums.name }}</h2>
      <div class="albums-list">
        <artwork-and-title
          class="albums-margin"
          v-for="album in albums.data"
          :item="album"
          :key="album.id"
          :type="$route.meta.isLibrary ? 'library-album' : 'album'"
        />
      </div>
    </div>

    <div v-if="playlists && playlists.data">
      <h2 class="browse-page-category">{{ playlists.name }}</h2>
      <div class="albums-list">
        <artwork-and-title
          class="albums-margin"
          v-for="playlist in playlists.data"
          :item="playlist"
          :key="playlist.id"
          :type="$route.meta.isLibrary ? 'library-playlist' : 'playlist'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Song from '../components/Song';
import ArtworkAndTitle from '../components/ArtworkAndTitle';
import playMixin from '@/components/Mixins/playMixin';
export default {
  name: 'songs-albums-playlists',
  components: { ArtworkAndTitle, Song },
  props: {
    songs: Object,
    albums: Object,
    playlists: Object,
  },
};
</script>
