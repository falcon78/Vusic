import helpers from '@/store/helpers';

const { getSafe, debounce } = helpers;
// eslint-disable-next-line operator-linebreak
const fakeArtwork =
  'https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/100x100bb.jpeg';

const playerState = {
  volume: 1,
  shuffle: 0,
  // Repeat mode , 0 = no repeat, 1 = one, 2 = all
  repeat: 0,
  playbackTimeInfo: {
    currentPlaybackTime: null,
    currentPlaybackDuration: null,
    currentPlaybackTimeRemaining: null,
  },
  playbackState: 0,
  currentlyPlaying: null,
  queue: [],
  queuePosition: 0,
  history: [],
  drmSupport: true,
  isPlaying: false,
  fakeLoading: false,
  songsBeforeShuffle: null,
};

const getters = {
  getNowPlayingStatus(state) {
    const currentPlaying = state.currentlyPlaying;
    return {
      id: getSafe(() => currentPlaying.id, 0),
      title: getSafe(() => currentPlaying.title, ''),
      trackNumber: getSafe(() => currentPlaying.trackNumber, ''),
      albumName: getSafe(() => currentPlaying.albumName, ''),
      albumInfo: getSafe(() => currentPlaying.albumInfo, ''),
      artistName: getSafe(() => currentPlaying.artistName, ''),
      isLoading: getSafe(() => currentPlaying.isLoading, ''),
      artwork: getSafe(
        () => MusicKit.formatArtworkURL(currentPlaying.artwork, 100, 100),
        fakeArtwork,
      ),
      isPlaying: getSafe(() => state.isPlaying),
    };
  },
};

const mutations = {
  setVolumeState(state, { volume }) {
    state.volume = volume;
  },
  setShuffle(state, { shuffle }) {
    state.shuffle = shuffle;
  },
  setRepeat(state, { repeat }) {
    state.repeat = repeat;
  },
  setCurrentlyPlaying(state, { currentlyPlaying }) {
    state.currentlyPlaying = Object.assign(currentlyPlaying);
  },
  setQueue(state, { items }) {
    state.queue = Object.assign({}, items);
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
  setIsPlaying(state, { isPlaying }) {
    state.isPlaying = isPlaying;
  },
  setFakeLoading(state, { loading }) {
    state.fakeLoading = loading;
  },
  setSongsBeforeShuffle(state, items) {
    state.songsBeforeShuffle = items;
  },
};

const actions = {
  initializeState({ commit, dispatch }) {
    const local = {
      volume: 1,
      shuffle: false,
      repeat: 0,
      storefront: 'us',
    };
    if (localStorage) {
      local.volume = getSafe(() => JSON.parse(localStorage.getItem('volume') || '1'), 1);
      local.shuffle = getSafe(() => JSON.parse(localStorage.getItem('shuffle') || 'false'), false);
      local.repeat = getSafe(() => JSON.parse(localStorage.getItem('repeat') || '0'), 0);
      local.storefront = getSafe(
        () => JSON.parse(localStorage.getItem('storefront') || 'us'),
        'us',
      );
    }
    dispatch('setVolume', { volume: local.volume });
    dispatch('setShuffle', local.shuffle);
    dispatch('setRepeatStatus', local.repeat);

    MusicKit.getInstance().storefrontId = local.storefront;
    MusicKit.getInstance().bitrate = 256;

    commit('setDrmStatus', { state: MusicKit.getInstance().player.canSupportDRM });
    commit('music/setStoreFront', { storefront: local.storefront }, { root: true });
    commit('music/setAuth', { auth: MusicKit.getInstance().isAuthorized }, { root: true });
  },

  changePlaybackTime(_, { time }) {
    return MusicKit.getInstance().player.seekToTime(time);
  },

  setRepeatStatus({ commit }, repeat = 'toggle') {
    // 0 - off, 1 - one, 2 - on
    if (repeat === 'toggle') {
      // eslint-disable-next-line operator-linebreak
      MusicKit.getInstance().player.repeatMode =
        MusicKit.getInstance().player.repeatMode === 0
          ? 2
          : MusicKit.getInstance().player.repeatMode - 1;
    } else {
      MusicKit.getInstance().player.repeatMode = repeat;
    }
    commit('setRepeat', { repeat: MusicKit.getInstance().player.repeatMode });
    if (window.localStorage) {
      window.localStorage.setItem(
        'repeat',
        JSON.stringify(MusicKit.getInstance().player.repeatMode),
      );
    }
  },
  setVolume({ commit }, { volume }) {
    const volumeValue = parseFloat(volume);
    MusicKit.getInstance().player.volume = volumeValue;
    commit('setVolumeState', { volume: volumeValue });
    if (window.localStorage) {
      window.localStorage.setItem('volume', JSON.stringify(volumeValue));
    }
  },

  setShuffle({ state, commit }, shuffle = 'toggle') {
    return new Promise((resolve, reject) => {
      let shuffleBool;
      if (shuffle === 'toggle') {
        MusicKit.getInstance().player.shuffle = state.shuffle === 0 ? 1 : 0;
        commit('setShuffle', { shuffle: MusicKit.getInstance().player.shuffleMode });
        shuffleBool = state.shuffle === 1;
      } else {
        MusicKit.getInstance().player.shuffle = shuffle;
        commit('setShuffle', { shuffle: MusicKit.getInstance().player.shuffleMode });
        shuffleBool = state.shuffle === 1;
      }
      if (window.localStorage) {
        window.localStorage.setItem('shuffle', JSON.stringify(shuffleBool));
      }
      resolve(true);
    });
  },
  async play({ commit, rootState }) {
    if (!rootState.music.auth.isAuthorized) {
      return MusicKit.getInstance().player.play();
    }
    commit('setFakeLoading', { loading: true });
    await MusicKit.getInstance().player.prepareToPlay();
    await MusicKit.getInstance().player.play();
    setTimeout(() => commit('setFakeLoading', { loading: false }), 1000);
  },
  async next() {
    await MusicKit.getInstance().player.skipToNextItem();
  },
  async previous() {
    await MusicKit.getInstance().player.skipToPreviousItem();
  },
  async pause() {
    await MusicKit.getInstance().player.pause();
  },
  async togglePlayPause({ state, dispatch, rootState }) {
    if (state.isPlaying) return dispatch('pause');
    if (!rootState.music.auth.isAuthorized) {
      return MusicKit.getInstance().player.play();
    }
    await MusicKit.getInstance().player.prepareToPlay();
    await MusicKit.getInstance().player.play();
  },
};

export default {
  namespaced: true,
  state: playerState,
  mutations,
  getters,
  actions,
};
