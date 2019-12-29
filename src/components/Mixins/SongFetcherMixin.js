const songFetcherMixin = {
  data() {
    return {
      offset: 0,
    };
  },
  methods: {
    async fetchAllItems(library = true, item = 'songs', options = null) {
      const music = library ? MusicKit.getInstance().api.library : MusicKit.getInstance().api;
      let fetchingData = true;
      let loopCount = 0;
      while (fetchingData || loopCount < 500) {
        try {
          await music[item](options, { offset: this.offset }).then((songs) => {
            fetchingData = !!songs.length;
            this[item] = songs;
            this.offset += songs.length;
            loopCount++;
          });
        } catch (e) {
          this.$swal({
            type: 'error',
            title: 'An Error Occurred...',
            text: e.message,
          });
        }
      }
    },
  },
};
export default songFetcherMixin;
