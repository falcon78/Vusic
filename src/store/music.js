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
};

const getters = {};

const mutations = {
  setAuth(state, { auth }) {
    state.auth.isAuthorized = auth;
  },
  setStoreFront(state, { storefront }) {
    state.storeFront = storefront;
  },
};

const actions = {
  initializeState() {},
  showLoginPage() {
    return MusicKit.getInstance().authorize();
  },
};

export default {
  namespaced: true,
  state: musicState,
  getters,
  mutations,
  actions,
};
