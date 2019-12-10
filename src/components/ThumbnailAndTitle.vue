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
      <router-link class="album-title" :to="{ name: type, params: { id: id } }" :title="title">
        {{ title }}
      </router-link>
      <div class="album-artist">
        <a v-if="artist && artist.length" class="sub-text" href="#" :title="artist">{{ artist }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { HeartIcon, PlayCircleIcon } from 'vue-feather-icons';
import { mapActions } from 'vuex';

export default {
  name: 'thumbnail-and-title',
  components: {
    HeartIcon,
    PlayCircleIcon,
  },
  props: {
    size: String, // small or big
    title: String,
    artist: String,
    artwork: String,
    id: String,
    type: String,
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
