const songFetcherMixin = {
  data() {
    return {
      offset: 200,
    };
  },
  methods: {
    async fetchAllItems(library = true, item = 'songs', options = null) {
      const music = library ? MusicKit.getInstance().api.library : MusicKit.getInstance().api;
      let fetchingData = true;
      while (fetchingData) {
        try {
          await music[item](options, { offset: 100 }).then((songs) => {
            fetchingData = !!songs.length;
            this[item] = songs;
            this.offset += songs.length;
          });
        } catch (e) {}
      }
    },
  },
};
export default songFetcherMixin;
