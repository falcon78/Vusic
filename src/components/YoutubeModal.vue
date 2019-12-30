<template>
  <div class="youtube-modal modal-base">
    <iframe
      v-if="currentlyPlaying"
      width="100%"
      height="100%"
      :src="getIframe"
      frameborder="0"
      allow="encrypted-media"
      allowfullscreen
    />
    <h2 v-else>No items playing.</h2>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import playMixin from '@/components/Mixins/playMixin';

export default {
  name: 'YoutubeModal',
  mixins: [playMixin],
  methods: {
    ...mapActions('modals', {
      fetchYoutubeVideo: 'fetchYoutubeVideo',
    }),
    getVideo() {
      this.fetchYoutubeVideo({
        artistName: this.currentlyPlaying.attributes.artistName,
        songName: this.currentlyPlaying.attributes.name,
      }).then(() => {
        MusicKit.getInstance().player.pause();
      });
    },
  },
  computed: {
    ...mapState('player', {
      currentlyPlaying: (state) => state.currentlyPlaying,
    }),
    ...mapState('modals', {
      youtubeVideoId: (state) => state.youtubeVideoId,
    }),
    getIframe() {
      return `https://www.youtube-nocookie.com/embed/${this.youtubeVideoId}`;
    },
  },
  watch: {
    currentlyPlaying: function() {
      this.getVideo();
    },
  },
  created() {
    this.getVideo();
  },
};
</script>

<style scoped></style>
