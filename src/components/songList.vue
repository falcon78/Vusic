<template>
  <div>
    <p>test</p>
  </div>
</template>

<script>
export default {
  name: 'song-list',
  props: {
    type: String,
    id: String,
  },
  data() {
    return {
      types: {
        libraryAlbum: ['library']['album'],
        libraryPlaylists: ['library']['playlist'],
        album: ['album'],
        playlist: ['playlist'],
      },
    };
  },
};
</script>
