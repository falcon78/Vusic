import keys from '../../apiKeys';
// import helpers from './helpers';

// eslint-disable-next-line no-undef

const musicState = {
  storeFront: '',
  auth: {
    isAuthorized: false,
  },
  appleMusic: {
    forYou: [],
    browse: [],
  },
  search: '',
  searchResults: null,
  searchIsLibrary: false,
  searchTyping: false,
};

const getters = {};

const mutations = {
  setSearchTyping(state, typing) {
    state.searchTyping = typing;
  },
  setSearch(state, search) {
    state.search = search;
  },
  setSearchResults(state, results) {
    state.searchResults = results;
  },
  setSearchType(state, type) {
    state.searchIsLibrary = type;
  },
  setAuth(state, { auth }) {
    state.auth.isAuthorized = auth;
  },
  setStoreFront(state, { storefront }) {
    state.storeFront = storefront;
  },
};

const actions = {
  initializeState() {},
};

export default {
  namespaced: true,
  state: musicState,
  getters,
  mutations,
  actions,
};
