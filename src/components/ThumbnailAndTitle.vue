<template>
  <div
    class="thumbnail-and-title"
    :style="{ backgroundImage: `url('${artwork}')` }"
    :class="`thumbnail-and-title__${size}`"
  >
    <div class="buttons">
      <button><img src="../assets/icons/heart.png" alt="like button" /></button>
      <button @click="playAlbum(id)">
        <img src="../assets/icons/play.png" alt="like button" />
      </button>
    </div>
    <div class="info">
      <p class="album-title" :title="title">{{ title }}</p>
      <a href="#" class="album-artist" :title="artist">{{ artist }}</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'thumbnail-and-title',
  props: {
    size: String, // small or big
    title: String,
    artist: String,
    artwork: String,
    id: String,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions('music', {
      addQueue: 'addQueueAlbum',
      play: 'play',
    }),
    async playAlbum(id) {
      await this.addQueue({ id });
      this.play();
    },
  },
};
</script>
