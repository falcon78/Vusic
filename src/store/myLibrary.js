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
  mergeLibraryAlbums(state, albums) {
    state.albums.push(...Object.assign(albums));
  },
  setStoreFront(state, { storefront }) {
    state.storeFront = storefront;
  },
  mergeLibraryPlaylists(state, playlists) {
    state.playlists.push(...Object.assign(playlists));
  },
  mergeLibrarySongs(state, songs) {
    state.songs.push(...Object.assign(songs));
  },
  setLibrarySongs(state, songs) {
    state.songs = songs;
  },
  setLibraryAlbums(state, albums) {
    state.albums = albums;
  },
  setLibraryPlaylists(state, playlists) {
    state.playlists = playlists;
  },
};

const actions = {
  addQueue(_, { type, id }) {
    return MusicKit.getInstance().setQueue({ [type]: id });
  },
  async fetchAllItems(
    { commit, state },
    { refresh = false, item, options = null, library = true },
  ) {
    const name = item.charAt(0).toLocaleUpperCase() + item.substr(1);
    if (refresh) commit(`setLibrary${name}`, []);
    if (state[item].length) return;
    let offset = 0;
    const music = library ? MusicKit.getInstance().api.library : MusicKit.getInstance().api;
    let noMoreData = false;
    while (!noMoreData) {
      const items = await music[item](!!options, { offset, limit: 100 });
      commit(`mergeLibrary${name}`, items);
      noMoreData = !items.length;
      offset += 100;
    }
  },
};

export default {
  namespaced: true,
  state: libraryState,
  mutations,
  actions,
};
