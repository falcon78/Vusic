<template>
  <div class="thumbnail-and-title" :style="{ backgroundImage: `url(${artwork()})` }">
    <div class="buttons">
      <a href="#"><img src="../assets/icons/heart.png" alt="like button"/></a>
      <a href="#"><img src="../assets/icons/play-button-arrowhead.png" alt="like button"/></a>
    </div>
    <div class="info">
      <p class="album-title">{{ title }}</p>
      <a class="album-artist">{{ artist }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'thumbnail-and-title',
  props: {
    title: String,
    artist: String,
    // artwork: String,
  },
  data() {},
  methods: {
    artwork() {
      return 'https://source.unsplash.com/random/300×300';
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/thumbnailAndTitle.scss';
</style>
