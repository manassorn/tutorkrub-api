const asyncHandler = fn => (req, res, next) => {
  if (fn.constructor.name === 'AsyncFunction') {
    // this is for capturing express error at root level
    return Promise
      .resolve(fn(req, res, next))
      .catch(next);
  } else {
    return fn
  }
};

module.exports = asyncHandler;