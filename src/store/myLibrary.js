import helpers from './helpers';

const libraryState = {
  storeFront: '',
  recentlyAdded: [],
  artists: [],
  songs: [],
  albums: [],
  playlists: [],
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
          () => MusicKit.formatArtworkURL(album.attributes.artwork, 100, 100),
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
  setLibraryPlaylists(state, { playlists }) {
    state.playlists = playlists;
  },
  setLibrarySongs(state, { songs }) {
    state.songs = songs;
  },
};

const actions = {
  async getAlbums({ commit }) {
    const albums = await MusicKit.getInstance().api.library.albums({ limit: 10000 });
    commit('setLibraryAlbums', { albums });
  },
  async getPlaylists({ commit }) {
    const playlists = await MusicKit.getInstance().api.library.playlists({ limit: 10000 });
    commit('setLibraryPlaylists', { playlists });
  },
  async getSongs({ commit }) {
    const songs = await MusicKit.getInstance().api.library.songs({ limit: 10000 });
    commit('setLibrarySongs', { songs });
  },
  addQueue(_, { type, id }) {
    return MusicKit.getInstance().setQueue({ [type]: id });
  },
};

export default {
  namespaced: true,
  state: libraryState,
  mutations,
  getters,
  actions,
};
