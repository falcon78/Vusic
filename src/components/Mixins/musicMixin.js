const musicMixin = {
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
  getApi(library = false) {
    if (library) return MusicKit.getInstance().api.library;
    return MusicKit.getInstance().api;
  },
};

export default musicMixin;
