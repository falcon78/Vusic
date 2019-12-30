<template>
  <div
    v-if="item.type !== 'stations'"
    class="thumbnail-and-title icon-buttons"
    :class="{ 'explicit-content-album': isExplicit }"
  >
    <div
      class="artwork"
      :style="{ backgroundImage: `url('${getArtwork(item.attributes.artwork, 120)}')` }"
    ></div>
    <div class="buttons">
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
        <p
          v-if="getSafe(() => item.attributes.artistName, false)"
          class="sub-text"
          :title="getSafe(() => item.attributes.artistName, '')"
        >
          {{ getSafe(() => item.attributes.artistName, '') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { PlayCircleIcon } from 'vue-feather-icons';
import { mapActions } from 'vuex';
import helpers from '@/store/helpers';

export default {
  name: 'artwork-and-title',
  components: {
    PlayCircleIcon,
  },
  props: {
    item: Object,
    type: String,
  },
  data() {
    return {
      optionsVisible: false,
    };
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
  computed: {
    isExplicit() {
      return this.getSafe(() => this.item.attributes.contentRating === 'explicit', false);
    },
  },
};
</script>
