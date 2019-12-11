<template>
  <div>
    <div class="album-details">
      <img :src="artwork" alt="artwork of currently viewing album" />
      <div class="album-metadata">
        <h1>{{ title }}</h1>
        <h3>{{ artistName }}</h3>
        <h4>{{ releaseDate }}</h4>
        <font-awesome-icon icon="user-secret" size="2x" />
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
