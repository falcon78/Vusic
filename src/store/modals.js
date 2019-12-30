import keys from '../../apiKeys';
import { getRequest, stringSimilarity } from './helpers';
const state = {
  lyricsModal: false,
  youtubeModal: false,
  queueModal: false,
  youtubeVideoId: null,
  lyrics: null,
  lyricsInfo: {
    song: '',
    artist: '',
  },
};

const mutations = {
  setLyricsModal(state, value = !state.lyricsModal) {
    state.lyricsModal = value;
  },
  setYoutubeModal(state, value = !state.youtubeModal) {
    state.youtubeModal = value;
  },
  setQueueModal(state, value = !state.queueModal) {
    state.queueModal = value;
  },
  setLyrics(state, lyrics) {
    state.lyrics = lyrics;
  },
  setVideoId(state, videoId) {
    state.youtubeVideoId = videoId;
  },
};

const actions = {
  fetchLyrics({ state, commit }, { songName, artistName }) {
    return new Promise(async (resolve, reject) => {
      if (songName === state.lyricsInfo.song && artistName === state.lyricsInfo.artist) {
        return resolve(false);
      }

      const baseUrl = 'https://api.genius.com/';
      const apiKey = `access_token=${keys.geniusAccessToken}`;
      const search = `search?q=${artistName} ${songName}`;
      let searchResponse = null;
      try {
        searchResponse = await getRequest(`${baseUrl}${search}&${apiKey}`);
      } catch (error) {
        return reject(error);
      }

      let hit = null;

      for (let response of searchResponse.response.hits) {
        const result = response.result;
        const isSong = response.type === 'song';
        const isSameSong =
          stringSimilarity(result.title_with_featured, songName) > 0.8 ||
          stringSimilarity(result.title, songName) > 0.8;
        const isSameArtist = stringSimilarity(result.primary_artist.name, artistName) > 0.8;
        if (isSong && isSameSong && isSameArtist) {
          hit = result.id;
          break;
        }
      }
      if (hit === null) {
        return reject(new Error('Lyrics not found.'));
      }
      let lyricsResponse = null;
      try {
        lyricsResponse = await getRequest(`${baseUrl}songs/${hit}?${apiKey}`);
      } catch (error) {
        return reject(error);
      }
      state.lyricsInfo = {
        song: songName,
        artist: artistName,
      };
      const embedContent = lyricsResponse.response.song.embed_content;
      commit('setLyrics', embedContent);
      return resolve(embedContent);
    });
  },
  fetchYoutubeVideo({ state, commit }, { artistName, songName }) {
    return new Promise(async (resolve, reject) => {
      const baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1';
      const query = `&q=${artistName} ${songName}&type=video`;
      const apiKey = `&key=${keys.youtubeApiKey}`;
      let searchResult = null;
      try {
        searchResult = await getRequest(baseUrl + query + apiKey);
      } catch (e) {
        return reject(new Error("Couldn't fetch video."));
      }
      const videoId = searchResult.items.pop().id.videoId;
      commit('setVideoId', videoId);
      resolve(videoId);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
