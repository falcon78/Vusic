import Vue from 'vue';
import Vuex from 'vuex';
import music from './music';

Vue.use(Vuex);

function test() {
  // eslint-disable-next-line no-use-before-define
  store.dispatch('music/getAlbums');
}

const store = new Vuex.Store({
  modules: {
    music,
  },
});

test();
export default store;
