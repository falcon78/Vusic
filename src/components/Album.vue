<template>
  <div>
    <div class="album-details">
      <img :src="artwork" alt="artwork of currently viewing album" />
      <div class="album-metadata">
        <p>{{ title }}</p>
        <p>{{ artistName }}</p>
        <p>{{ releaseDate }}</p>
      </div>
      <div class="song-list"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Album',
  props: {
    id: String,
    type: String,
    artwork: String,
    title: String,
    artistName: String,
    releaseDate: String,
    playParams: Object,
  },
};
</script>
