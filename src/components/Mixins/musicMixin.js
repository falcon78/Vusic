const musicMixin = {
  methods: {
    async playSongFromItems(playParams, startPosition = 0) {
      const music = MusicKit.getInstance();
      if (playParams.kind === 'album' || playParams.kind === 'playlist') {
        await music.setQueue({ [playParams.kind]: playParams.id });
      } else {
        await music.setQueue(playParams);
      }
      await music.player.changeToMediaAtIndex(startPosition);
    },
    milliToMinutes(millis) {
      return MusicKit.formatMediaTime(millis / 1000);
    },
    async findAlbumId(albumName, artistName) {
      let albumId;
      await MusicKit.getInstance()
        .api.search(`${artistName} ${albumName}`)
        .then((result) => {
          result = Object.assign(result);
          albumId = result.albums.data[0].id;
        })
        .catch(() => {
          albumId = false;
        });
      return albumId;
    },
    async routeToAlbum(artistName, albumName) {
      const id = await this.findAlbumId(artistName, albumName);
      if (!id) return false;
      if (this.$route.params.id === id) return false;
      await this.$router.push({
        name: 'album',
        params: { id },
      });
    },

    getApi() {
      return this.$route.meta.isLibrary
        ? MusicKit.getInstance().api.library
        : MusicKit.getInstance().api;
    },
  },
};

export default musicMixin;
