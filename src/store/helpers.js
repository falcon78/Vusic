const helpers = {
  getSafe(fn, defaultVal = 'Could not load data') {
    try {
      return fn();
    } catch (e) {
      console.log(e);
      return defaultVal;
    }
  },
};

export default helpers;
