<template>
  <div class="thumbnail-and-title icon-buttons" :class="`thumbnail-and-title__${size}`">
    <div class="artwork" :style="{ backgroundImage: `url('${artwork}')` }"></div>
    <div class="buttons">
      <button class="button">
        <HeartIcon class="button-svg" />
      </button>
      <button class="button button-svg" @click="playItem(type, id)">
        <PlayCircleIcon class="button-svg" />
      </button>
    </div>
    <div class="info">
      <router-link class="album-title" :to="{ name: to, params: { id: 'abc123' } }" :title="title">
        {{ title }}
      </router-link>
      <a v-if="artist && artist.length" href="#" class="album-artist" :title="artist">{{
        artist
      }}</a>
      <p v-else class="album-artist">{{ type.charAt(0).toUpperCase() + type.slice(1) }}</p>
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
    url: String,
    type: String,
    to: String,
    playParams: Object,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions('player', {
      play: 'play',
    }),
    async playItem() {
      await MusicKit.getInstance().setQueue({ [this.playParams.kind]: this.playParams.id });
      this.play();
    },
  },
};
</script>
