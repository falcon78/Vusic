import helpers from '@/store/helpers';
// eslint-disable-next-line no-undef
const sdk = MusicKit;
const music = sdk.getInstance();

const playerState = {
  // @TODO Volume is 1 max?
  volume: 1,
  // shuffle
  shuffle: 0,
  // Repeat mode , 0 = no repeat, 1 = one, 2 = all
  repeat: 0,
  // Currently playing MediaItem (Object with type MediaItem)
  currentlyPlaying: null,
  // how much has current playing song progressed 1 is max
  // ( playProgress x 60 to get time)
  playProgress: 0,
  // @TODO: WTF is this?
  playbackState: 0,
  // Arrays of MediaItem Objects
  queue: [],
  // current position in queue (Array Index of queue)
  queuePosition: 0, // done commit and action
  history: [],
  drmSupport: true,
};

const getters = {
  getNowPlayingStatus(state) {
    const currentPlaying = state.currentlyPlaying;
    if (!currentPlaying) return {};
    console.log(currentPlaying);
    const { getSafe } = helpers;
    const nowPlaying = {
      id: getSafe(() => currentPlaying.id),
      title: getSafe(() => currentPlaying.title),
      trackNumber: getSafe(() => currentPlaying.trackNumber),
      albumName: getSafe(() => currentPlaying.albumName),
      albumInfo: getSafe(() => currentPlaying.albumInfo),
      artistName: getSafe(() => currentPlaying.artistName),
      isLoading: getSafe(() => currentPlaying.isLoading),
      playProgress: state.playProgress,
      artwork: getSafe(() => sdk.formatArtworkURL(currentPlaying.artwork, 140, 140)),
      isPlaying: getSafe(() => currentPlaying.isPlaying),
    };
    console.log(nowPlaying);
    return nowPlaying;
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
  /* setPlayPosition(state, { time }) {
    state.playPosition = time;
  }, */
  setQueue(state, { items }) {
    state.queue = items;
  },
  setQueuePosition(state, { position }) {
    // const oldPosition = position.oldPosition;
    state.queuePosition = position.position;
    console.log(position);
  },
  setDrmStatus(state, { drmSupport }) {
    state.drmSupport = drmSupport;
  },
  setPlaybackState(state, { playbackState }) {
    state.playbackState = playbackState;
  },
  setPlayProgress(state, { progress }) {
    state.playProgress = progress;
  },
};

const actions = {
  initializeState({ commit, dispatch }) {
    const local = {
      volume: 1,
      shuffle: false,
    };
    if (localStorage && localStorage.getItem('volume')) {
      try {
        local.volume = JSON.parse(localStorage.getItem('volume') || '1');
      } catch (e) {
        local.volume = 1;
      }
    }
    dispatch('setVolume', { volume: local.volume });

    if (localStorage && localStorage.getItem('shuffle')) {
      try {
        local.shuffle = JSON.parse(localStorage.getItem('shuffle') || 'false');
      } catch (err) {
        local.shuffle = music.player.shuffleMode;
        console.error(err);
      }
    }
    dispatch('setShuffle', local.shuffle);

    if (localStorage && localStorage.getItem('repeat')) {
      try {
        dispatch('setRepeatStatus', JSON.parse(localStorage.getItem('repeat') || '0'));
      } catch (err) {
        console.error(err);
      }
    }

    music.bitrate = 256;
    commit('setDrmStatus', { state: music.player.canSupportDRM });
    commit('music/setStoreFront', { storefront: music.storefrontId }, { root: true });
    commit('music/setAuth', { auth: music.isAuthorized }, { root: true });
  },

  setRepeatStatus({ commit }, repeat = 'toggle') {
    if (repeat === 'toggle') {
      music.player.repeatMode = music.player.repeatMode === 0 ? 2 : music.player.repeatMode - 1;
    } else {
      music.player.repeatMode = repeat;
    }
    commit('setRepeat', { repeat: music.player.repeat });
    if (window.localStorage) {
      window.localStorage.setItem('repeat', JSON.stringify(music.player.repeatMode));
    }
  },
  setVolume({ commit }, { volume }) {
    const vol = parseFloat(volume);
    music.player.volume = vol;
    commit('setVolume', { volume: vol });
    if (window.localStorage) {
      window.localStorage.setItem('volume', JSON.stringify(vol));
    }
  },

  setShuffle({ state, commit }, shuffle = 'toggle') {
    let shuffleBool;
    if (shuffle === 'toggle') {
      music.player.shuffle = state.shuffle === 0 ? 1 : 0;
      commit('setShuffle', { shuffle: music.player.shuffleMode });
      shuffleBool = state.shuffle === 1;
    } else {
      music.player.shuffle = shuffle;
      commit('setShuffle', { shuffle: music.player.shuffleMode });
      shuffleBool = state.shuffle === 1;
    }
    if (window.localStorage) {
      window.localStorage.setItem('shuffle', JSON.stringify(shuffleBool));
    }
  },
};

export default {
  namespaced: true,
  state: playerState,
  mutations,
  getters,
  actions,
};
