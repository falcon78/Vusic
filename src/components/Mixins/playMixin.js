import { mapActions } from 'vuex';

export default {
  name: 'playMixin',
  data() {
    return {
      isLibrary: this.$route.meta.isLibrary,
      music: this.isLibrary ? MusicKit.getInstance().api.library : MusicKit.getInstance().api,
    };
  },
  methods: {
    ...mapActions('player', {
      play: 'play',
    }),
    async playAlbumOrPlaylist(playParams) {
      await this.music.setQueue(playParams);
      await this.play();
    },
  },
};
