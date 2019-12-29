import Vue from 'vue';
import Vuex from 'vuex';
import music from './music';
import player from './player';
import myLibrary from './myLibrary';
import modals from '@/store/modals';
import keys from '../../apiKeys';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    music,
    player,
    myLibrary,
    modals,
  },
});

MusicKit.configure({
  developerToken: keys.appleMusic.developerToken,
  app: {
    name: 'My Cool Web App',
    build: '1978.4.1',
  },
});

store.dispatch('player/initializeState');
store.dispatch('music/initializeState');

store.commit('music/setStoreFront', MusicKit.getInstance().storefrontId);
store.commit('music/setAuth', { auth: MusicKit.getInstance().isAuthorized });

MusicKit.getInstance().addEventListener(MusicKit.Events.authorizationStatusDidChange, () => {
  store.commit('music/setAuth', { auth: MusicKit.getInstance().isAuthorized });
});
MusicKit.getInstance().addEventListener(MusicKit.Events.playbackStateDidChange, (event) => {
  store.commit('player/setPlaybackState', { playbackState: event.state });
  store.commit('player/setIsPlaying', { isPlaying: MusicKit.getInstance().player.isPlaying });
});
MusicKit.getInstance().addEventListener(MusicKit.Events.mediaItemDidChange, (event) => {
  store.commit('player/setCurrentlyPlaying', { currentlyPlaying: event.item });
});

// 0 to 1 range of how much current item has played
// MusicKit.getInstance().addEventListener(MusicKit.Events.playbackProgressDidChange, (event) => {
// store.commit('player/setPlayProgress', { progress: event.progress });
// });
MusicKit.getInstance().addEventListener(MusicKit.Events.playbackTimeDidChange, (event) => {
  store.commit('player/setPlaybackTime', {
    playtimeInfo: event,
  });
});
MusicKit.getInstance().addEventListener(MusicKit.Events.queueItemsDidChange, (event) => {
  store.commit('player/setQueue', { items: event });
});
MusicKit.getInstance().addEventListener(MusicKit.Events.queuePositionDidChange, (event) => {
  store.commit('player/setQueuePosition', { position: event });
});

export default store;
