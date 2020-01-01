const keys = {
  appleMusic: {
    // replace this
    developerToken: 'api key goes here',
    name: 'Vusic',
    build: 'ver1',
    version: 'ver1',
  },
  // replace this
  geniusAccessToken: 'Api Key',
  // replace this
  youtubeApiKey: 'api key',
};

function getAppleMusicConfig() {
  return new Headers({
    Authorization: 'Bearer ' + MusicKit.getInstance().developerToken,
    Accept: 'application/json',
    ['Music-User-Token']: '' + MusicKit.getInstance().musicUserToken,
    ['Content-Type']: 'application/json',
  });
}

export { getAppleMusicConfig };
export default keys;
