import Vue from 'vue';
import Vuex from 'vuex';
import music from './music';
import player from './player';

Vue.use(Vuex);

// eslint-disable-next-line no-undef
const sdk = MusicKit;
const musicKit = sdk.getInstance();

const store = new Vuex.Store({
  modules: {
    music,
    player,
  },
});

document.addEventListener('musickitloaded', () => {
  store.dispatch('player/initializeState');
  store.dispatch('music/initializeState');
});
musicKit.addEventListener(sdk.Events.authorizationStatusDidChange, () => {
  store.commit('music/setAuth', { auth: musicKit.isAuthorized });
});
musicKit.addEventListener(sdk.Events.playbackStateDidChange, (event) => {
  store.commit('player/setPlaybackState', { playbackState: event.state });
});
musicKit.addEventListener(sdk.Events.mediaItemDidChange, (event) => {
  store.commit('player/setCurrentlyPlaying', { currentlyPlaying: event.item });
});
// musicKit.addEventListener(sdk.Events.playbackProgressDidChange, (event) => {
// store.commit('player/setPlayProgress', { progress: event.progress });
// });
musicKit.addEventListener(sdk.Events.playbackTimeDidChange, (event) => {
  store.commit('player/setPlaybackTime', {
    playtimeInfo: event,
  });
});
musicKit.addEventListener(sdk.Events.queueItemsDidChange, (event) => {
  store.commit('player/setQueue', { items: event });
});
musicKit.addEventListener(sdk.Events.queuePositionDidChange, (event) => {
  store.commit('player/setQueuePosition', { position: event });
});

export default store;
