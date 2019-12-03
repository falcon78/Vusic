const helpers = {
  getSafe(fn, defaultVal = '') {
    try {
      return fn();
    } catch (e) {
      console.log(e);
      return defaultVal;
    }
  },
};

export default helpers;
