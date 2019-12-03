<template>
  <div class="player">
    <div v-if="!!getNowPlayingStatus.id">
      <p>{{ getNowPlayingStatus.title }}</p>
      <p>{{ getNowPlayingStatus.albumName }}</p>
      <p>{{ getNowPlayingStatus.id }}</p>
      <p>{{ getNowPlayingStatus.playProgress }}</p>
      <img :src="getNowPlayingStatus.artwork" alt="Artwork Currently Playing Item" />
    </div>
    <a-button type="primary">Primary</a-button>
    <div id="player-scrubber" @mousedown="handleScrubClick" @mouseover="thumbHovered = true">
      <div id="playback-status-bar"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'music-player',
  computed: {
    ...mapGetters('player', {
      getNowPlayingStatus: 'getNowPlayingStatus',
    }),
  },
  methods: {
    handleScrubClick(e) {
      console.log(e);
    },
  },
};
</script>
