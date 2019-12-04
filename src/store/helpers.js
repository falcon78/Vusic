const helpers = {
  getSafe(fn, defaultVal = null) {
    try {
      return fn();
    } catch (e) {
      console.log(e);
      return defaultVal;
    }
  },
};

export default helpers;
