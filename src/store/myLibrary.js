import helpers from './helpers';

const libraryState = {
  storeFront: '',
  recentlyAdded: [],
  artists: [],
  songs: [],
  albums: [],
  playlists: [],
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
  actions,
};
