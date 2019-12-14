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
