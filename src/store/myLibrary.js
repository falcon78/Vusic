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
    state.albums.push(...JSON.parse(JSON.stringify(albums)));
  },
  setStoreFront(state, { storefront }) {
    state.storeFront = storefront;
  },
  mergeLibraryPlaylists(state, playlists) {
    state.playlists.push(...JSON.parse(JSON.stringify(playlists)));
  },
  mergeLibrarySongs(state, songs) {
    state.songs.push(...JSON.parse(JSON.stringify(songs)));
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
    return new Promise(async (resolve, reject) => {
      try {
        const name = item.charAt(0).toLocaleUpperCase() + item.substr(1);
        if (refresh) commit(`setLibrary${name}`, []);
        if (state[item].length) {
          resolve(true);
          return;
        }
        let offset = 0;
        const music = library ? MusicKit.getInstance().api.library : MusicKit.getInstance().api;
        let noMoreData = false;
        let loopCount = 0;
        while (!noMoreData && loopCount < 500) {
          const items = await music[item](!!options, { offset, limit: 100 });
          commit(`mergeLibrary${name}`, items);
          noMoreData = !items.length;
          offset += 100;
          loopCount++;
        }
        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  },
};

export default {
  namespaced: true,
  state: libraryState,
  mutations,
  actions,
};
