<template>
  <div class="thumbnail-and-title icon-buttons" :class="`thumbnail-and-title__${size}`">
    <div
      class="artwork"
      :style="{ backgroundImage: `url('${getArtwork(item.attributes.artwork, 120)}')` }"
    ></div>
    <div class="buttons">
      <button class="button">
        <HeartIcon class="button-svg" />
      </button>
      <button class="button button-svg" @click="playItem">
        <PlayCircleIcon class="button-svg" />
      </button>
    </div>
    <div class="info">
      <router-link
        class="album-title"
        :to="{ name: type, params: { id: item.id } }"
        :title="item.attributes.name"
      >
        {{ item.attributes.name }}
      </router-link>
      <div class="album-artist">
        <a
          v-if="getSafe(() => item.attributes.artistName, false)"
          class="sub-text"
          href="#"
          :title="getSafe(() => item.attributes.artistName, '')"
          >{{ getSafe(() => item.attributes.artistName, '') }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { HeartIcon, PlayCircleIcon } from 'vue-feather-icons';
import { mapActions } from 'vuex';
import helpers from '@/store/helpers';

export default {
  name: 'thumbnail-and-title',
  components: {
    HeartIcon,
    PlayCircleIcon,
  },
  props: {
    size: String, // small or big
    item: Object,
    type: String,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions('player', {
      play: 'play',
    }),
    getArtwork: helpers.getUrl,
    getSafe: helpers.getSafe,
    setQueue: helpers.setQueue,

    async playItem() {
      await this.setQueue(this.item.attributes.playParams);
      this.play();
    },
  },
};
</script>
