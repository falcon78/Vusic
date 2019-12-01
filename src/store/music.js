import keys from '../../apiKeys';

// eslint-disable-next-line no-undef
MusicKit.configure({
  developerToken: keys.appleMusic.developerToken,
  app: {
    name: 'My Cool Web App',
    build: '1978.4.1',
  },
});

function getSafe(fn, defaultVal = '') {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

function musicKit() {
  // eslint-disable-next-line no-undef
  return MusicKit.getInstance();
}

const state = {
  auth: {
    isLoggedIn: false,
  },
  library: {
    storeFront: '',
    recentlyAdded: [],
    artists: [],
    songs: [],
    albums: [],
  },
  appleMusic: {
    forYou: [],
    browse: [],
  },
  player: {
    playing: null,
    playbackTime: 0,
    shuffle: false,
    repeat: false,
    volume: 100,
    bitrate: 0,
  },
};
const getters = {
  getLibraryAlbums: (musicState) => {
    const albums = [];
    musicState.library.albums.forEach((album) => {
      albums.push({
        id: album.id,
        artist: album.attributes.artistName,
        title: album.attributes.name,
        artwork: getSafe(() => album.attributes.artwork.url),
      });
    });
    return albums;
  },
};
const mutations = {
  setLibraryAlbums(musicState, { albums }) {
    state.library.albums = albums;
  },
};
const actions = {
  async getAlbums({ commit }) {
    const albums = await musicKit().api.library.albums({ limit: 500 });
    commit('setLibraryAlbums', { albums });
  },
  // eslint-disable-next-line no-unused-vars
  addQueueAlbum({ commit }, { id }) {
    return musicKit().setQueue({ album: id });
  },
  play() {
    musicKit().player.play();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
