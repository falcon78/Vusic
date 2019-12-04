import helpers from './helpers';

// eslint-disable-next-line no-undef
const sdk = MusicKit;
const musicKit = sdk.getInstance();

const libraryState = {
  storeFront: '',
  recentlyAdded: [],
  artists: [],
  songs: [],
  albums: [],
};

const getters = {
  getLibraryAlbums: (state) => {
    const albums = [];
    const { getSafe } = helpers;
    state.albums.forEach((album) => {
      albums.push({
        id: getSafe(() => album.id),
        artist: getSafe(() => album.attributes.artistName),
        title: getSafe(() => album.attributes.name),
        artwork: getSafe(
          () => sdk.formatArtworkURL(album.attributes.artwork, 100, 100),
          'https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/100x100bb.jpeg',
        ),
      });
    });
    return albums;
  },
};

const mutations = {
  setLibraryAlbums(state, { albums }) {
    state.albums = albums;
  },
  setStoreFront(state, { storefront }) {
    state.storeFront = storefront;
  },
};

const actions = {
  async getAlbums({ commit }) {
    const albums = await musicKit.api.library.albums({ limit: 500 });
    commit('setLibraryAlbums', { albums });
  },
  // eslint-disable-next-line no-unused-vars
  addQueueAlbum({ commit }, { id }) {
    return musicKit.setQueue({ album: id });
  },
};

export default {
  namespaced: true,
  state: libraryState,
  mutations,
  getters,
  actions,
};
