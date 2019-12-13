const helpers = {
  getSafe(fn, defaultVal = null) {
    try {
      return fn();
    } catch (_) {
      console.error(`cant access property: ${fn}`);
      return defaultVal;
    }
  },

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this,
        args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  fakeArtwork:
    'https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/200x200bb.jpeg',
  getUrl(artwork, size) {
    return helpers.getSafe(
      () => MusicKit.formatArtworkURL(artwork, size, size),
      helpers.fakeArtwork,
    );
  },
  getType(type) {
    const albumRegex = /album/gm;
    const playlistRegex = /playlist/gm;
    if (type.match(albumRegex)) return 'album';
    if (type.match(playlistRegex)) return 'playlist';
  },
  async playSongFromItems(playParams, startPosition = 0) {
    const music = MusicKit.getInstance();
    await music.setQueue({ [playParams.kind]: playParams.id });
    await music.player.changeToMediaAtIndex(startPosition);
  },
  setQueue(playParams) {
    return MusicKit.getInstance().setQueue({ [playParams.kind]: playParams.id });
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

export default helpers;
