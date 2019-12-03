import keys from '../../apiKeys';
import helpers from './helpers';

// eslint-disable-next-line no-undef
MusicKit.configure({
  developerToken: keys.appleMusic.developerToken,
  app: {
    name: 'My Cool Web App',
    build: '1978.4.1',
  },
});

// eslint-disable-next-line no-undef
const sdk = MusicKit;
function musicKit() {
  // eslint-disable-next-line no-undef
  return sdk.getInstance();
}

const musicState = {
  auth: {
    isAuthorized: false,
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
  getLibraryAlbums: (state) => {
    const albums = [];
    const { getSafe } = helpers;
    state.library.albums.forEach((album) => {
      albums.push({
        id: getSafe(() => album.id),
        artist: getSafe(() => album.attributes.artistName),
        title: getSafe(() => album.attributes.name),
        artwork: getSafe(
          () => sdk.formatArtworkURL(album.attributes.artwork, 70, 70),
          'https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/100x100bb.jpeg',
        ),
      });
    });
    return albums;
  },
};

const mutations = {
  setLibraryAlbums(state, { albums }) {
    state.library.albums = albums;
  },
  setAuth(state, { auth }) {
    state.auth.isAuthorized = auth;
  },
  setStoreFront(state, { storefront }) {
    state.library.storeFront = storefront;
  },
};

const actions = {
  initializeState() {
    console.log('music state init');
  },
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
  state: musicState,
  getters,
  mutations,
  actions,
};
