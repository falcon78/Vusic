const songFetcherMixin = {
  data() {
    return {
      offset: 0,
    };
  },
  methods: {
    async fetchAllItems(library = true, item = 'songs', options = null) {
      const music = library ? MusicKit.getInstance().api.library : MusicKit.getInstance().api;
      while (this.fetchingData) {
        try {
          await music[item](options, { offset: this.offset, limit: 100 }).then((songs) => {
            this.fetchingData = !!songs.length;
            this[item].push(...songs);
          });
          this.offset += 100;
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
export default songFetcherMixin;
