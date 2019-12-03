import Vue from 'vue';
import Vuex from 'vuex';
import music from './music';
import player from './player';

Vue.use(Vuex);

// eslint-disable-next-line no-undef
const sdk = MusicKit;
const musicInstance = sdk.getInstance();

const store = new Vuex.Store({
  modules: {
    music,
    player,
  },
});

document.addEventListener('musickitloaded', () => {
  store.dispatch('player/initializeState');
});
musicInstance.addEventListener(sdk.Events.authorizationStatusDidChange, () => {
  store.commit('music/setAuth', { auth: musicInstance.isAuthorized });
});
musicInstance.addEventListener(sdk.Events.playbackStateDidChange, (event) => {
  store.commit('player/setPlaybackState', { playbackState: event.state });
});
musicInstance.addEventListener(sdk.Events.mediaItemDidChange, (event) => {
  console.log(event);
  store.commit('player/setCurrentlyPlaying', { currentlyPlaying: event.item });
});
musicInstance.addEventListener(sdk.Events.playbackProgressDidChange, (event) => {
  store.commit('player/setPlayProgress', { progress: event.progress });
});
musicInstance.addEventListener(sdk.Events.queueItemsDidChange, (event) => {
  store.commit('player/setQueue', { items: event });
});
musicInstance.addEventListener(sdk.Events.queuePositionDidChange, (event) => {
  store.commit('player/setQueuePosition', { position: event });
});

export default store;
