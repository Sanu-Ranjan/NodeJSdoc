const resObject = {
  success(message, data = null) {
    return {
      success: true,
      message: message,
      data: data,
    };
  },
  fail(message, details = null) {
    return {
      success: false,
      error: message,
      details: details,
    };
  },
};

module.exports = {
  resObject,
};
