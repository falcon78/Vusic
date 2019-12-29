import helpers from '@/store/helpers';

const getSafeMixin = {
  methods: {
    getSafe(fn, defaultVal = null) {
      try {
        return fn();
      } catch (_) {
        return defaultVal;
      }
    },
    getUrl(artwork, size) {
      const fakeArtwork =
        'https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/200x200bb.jpeg';
      return helpers.getSafe(
        () => MusicKit.formatArtworkURL(artwork, size, size),
        helpers.fakeArtwork,
      );
    },
  },
};
export default getSafeMixin;
