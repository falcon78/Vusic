const helpers = {
  getSafe(fn, defaultVal = null) {
    try {
      return fn();
    } catch (_) {
      return defaultVal;
    }
  },

  fakeArtwork:
    'https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/200x200bb.jpeg',
  getUrl(artwork, size) {
    return helpers.getSafe(
      () => MusicKit.formatArtworkURL(artwork, size, size),
      helpers.fakeArtwork,
    );
  },

  setQueue(playParams) {
    try {
      return MusicKit.getInstance().setQueue({ [playParams.kind]: playParams.id });
    } catch (e) {
      this.$swal({
        type: 'error',
        title: e.name,
        text: e.message,
      });
    }
  },
  milliToMinutes(millis) {
    return getSafe(() => MusicKit.formatMediaTime(millis / 1000), 60);
  },
  getApi(library = false) {
    if (library) return MusicKit.getInstance().api.library;
    return MusicKit.getInstance().api;
  },
};
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function getRequest(url) {
  return new Promise((resolve, reject) => {
    try {
      const request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = function() {
        const parsedResponse = JSON.parse(request.response);
        resolve(parsedResponse);
      };
      request.send();
    } catch (error) {
      reject(error);
    }
  });
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function stringSimilarity(s1, s2) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

export { debounce, getRequest, stringSimilarity };
export default helpers;
