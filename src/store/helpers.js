const helpers = {
  getSafe(fn, defaultVal = null) {
    try {
      return fn();
    } catch (_) {
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

  setQueue(playParams) {
    return MusicKit.getInstance().setQueue({ [playParams.kind]: playParams.id });
  },
  milliToMinutes(millis) {
    return MusicKit.formatMediaTime(millis / 1000);
  },
  getApi(library = false) {
    if (library) return MusicKit.getInstance().api.library;
    return MusicKit.getInstance().api;
  },
};

export default helpers;
