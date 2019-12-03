<template>
  <div class="thumbnail-and-title icon-buttons" :class="`thumbnail-and-title__${size}`">
    <div class="artwork" :style="{ backgroundImage: `url('${artwork}')` }"></div>
    <div class="buttons">
      <button class="button">
        <HeartIcon class="button-svg" />
      </button>
      <button class="button button-svg" @click="playAlbum(id)">
        <PlayCircleIcon class="button-svg" />
      </button>
    </div>
    <div class="info">
      <p class="album-title" :title="title">{{ title }}</p>
      <a href="#" class="album-artist" :title="artist">{{ artist }}</a>
    </div>
  </div>
</template>

<script>
import { HeartIcon, PlayCircleIcon } from 'vue-feather-icons';
import { mapActions } from 'vuex';

export default {
  name: 'thumbnail-and-title',
  components: { HeartIcon, PlayCircleIcon },
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
