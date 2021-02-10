

module.exports.responseOk = (res, data) => {
    data = data || {}
    res.json({
        data: data
    })
}
module.exports.responseError = (res, message) => {
    res.status(400).json({
        error: {
            message: message
        }
    })
}
module.exports.responseErrorCode = (res, code, message) => {
  res.status(code).json({
    error: {
      message: message
    }
  })
}
module.exports.responseError400 = (res, message) => {
    res.status(400).json({
        error: {
            message: message
        }
    })
}