import helpers from '@/store/helpers';

const { getSafe } = helpers;
// eslint-disable-next-line no-undef
const sdk = MusicKit;
const musicKit = sdk.getInstance();
// eslint-disable-next-line operator-linebreak
const fakeArtwork =
  'https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/100x100bb.jpeg';

const playerState = {
  // @TODO Volume is 1 max?
  volume: 1,
  // shuffle
  shuffle: 0,
  // Repeat mode , 0 = no repeat, 1 = one, 2 = all
  repeat: 0,
  // Currently playing MediaItem (Object with type MediaItem)
  playbackTimeInfo: {
    currentPlaybackTime: null,
    currentPlaybackDuration: null,
    currentPlaybackTimeRemaining: null,
  },
  // @TODO: WTF is this?
  playbackState: 0,
  // Arrays of MediaItem Objects
  currentlyPlaying: null,
  queue: [],
  // current position in queue (Array Index of queue)
  queuePosition: 0, // done commit and action
  history: [],
  drmSupport: true,
};

const getters = {
  getNowPlayingStatus(state) {
    const currentPlaying = state.currentlyPlaying;
    // @TODO: Separate playback info to different place
    const currentlyPlayingItem = {
      id: getSafe(() => currentPlaying.id),
      title: getSafe(() => currentPlaying.title) || 'Not Playing',
      trackNumber: getSafe(() => currentPlaying.trackNumber),
      albumName: getSafe(() => currentPlaying.albumName),
      albumInfo: getSafe(() => currentPlaying.albumInfo),
      artistName: getSafe(() => currentPlaying.artistName),
      isLoading: getSafe(() => currentPlaying.isLoading),
      artwork: getSafe(() => sdk.formatArtworkURL(currentPlaying.artwork, 140, 140)) || fakeArtwork,
      isPlaying: getSafe(() => currentPlaying.isPlaying),
    };
    return currentlyPlayingItem;
  },
};

const mutations = {
  setVolume(state, { volume }) {
    state.volume = volume;
  },
  setShuffle(state, { shuffle }) {
    state.shuffle = shuffle;
  },
  setRepeat(state, { repeat }) {
    state.repeat = repeat;
  },
  setCurrentlyPlaying(state, { currentlyPlaying }) {
    state.currentlyPlaying = currentlyPlaying;
  },
  setQueue(state, { items }) {
    state.queue = items;
  },
  setQueuePosition(state, { position }) {
    // const oldPosition = position.oldPosition;
    state.queuePosition = position.position;
  },
  setDrmStatus(state, { drmSupport }) {
    state.drmSupport = drmSupport;
  },
  setPlaybackState(state, { playbackState }) {
    state.playbackState = playbackState;
  },
  setPlaybackTime(state, { playtimeInfo }) {
    state.playbackTimeInfo = playtimeInfo;
  },
};

const actions = {
  initializeState({ commit, dispatch }) {
    const local = {
      volume: 1,
      shuffle: false,
    };
    if (localStorage) {
      local.volume = getSafe(() => JSON.parse(localStorage.getItem('volume') || '1'), 1);
      local.shuffle = getSafe(() => JSON.parse(localStorage.getItem('shuffle') || 'false'), false);
      local.repeat = getSafe(() => JSON.parse(localStorage.getItem('repeat') || '0'), 0);
    }
    dispatch('setVolume', { volume: local.volume });
    dispatch('setShuffle', local.shuffle);
    dispatch('setRepeatStatus', local.repeat);

    musicKit.bitrate = 256;
    commit('setDrmStatus', { state: musicKit.player.canSupportDRM });
    commit('music/setStoreFront', { storefront: musicKit.storefrontId }, { root: true });
    commit('music/setAuth', { auth: musicKit.isAuthorized }, { root: true });
  },

  changePlaybackTime(_, { time }) {
    return musicKit.player.seekToTime(time);
  },

  setRepeatStatus({ commit }, repeat = 'toggle') {
    if (repeat === 'toggle') {
      // eslint-disable-next-line operator-linebreak
      musicKit.player.repeatMode =
        musicKit.player.repeatMode === 0 ? 2 : musicKit.player.repeatMode - 1;
    } else {
      musicKit.player.repeatMode = repeat;
    }
    commit('setRepeat', { repeat: musicKit.player.repeat });
    if (window.localStorage) {
      window.localStorage.setItem('repeat', JSON.stringify(musicKit.player.repeatMode));
    }
  },
  setVolume({ commit }, { volume }) {
    const volumeValue = parseFloat(volume);
    musicKit.player.volume = volumeValue;
    commit('setVolume', { volume: volumeValue });
    if (window.localStorage) {
      window.localStorage.setItem('volume', JSON.stringify(volumeValue));
    }
  },

  setShuffle({ state, commit }, shuffle = 'toggle') {
    let shuffleBool;
    if (shuffle === 'toggle') {
      musicKit.player.shuffle = state.shuffle === 0 ? 1 : 0;
      commit('setShuffle', { shuffle: musicKit.player.shuffleMode });
      shuffleBool = state.shuffle === 1;
    } else {
      musicKit.player.shuffle = shuffle;
      commit('setShuffle', { shuffle: musicKit.player.shuffleMode });
      shuffleBool = state.shuffle === 1;
    }
    if (window.localStorage) {
      window.localStorage.setItem('shuffle', JSON.stringify(shuffleBool));
    }
  },
  play() {
    return musicKit.player.play();
  },
};

export default {
  namespaced: true,
  state: playerState,
  mutations,
  getters,
  actions,
};
