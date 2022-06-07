

module.exports.responseOk = (res, data) => {
    data = data || {}
    res.json({
        data: data
    })
}
module.exports.ok = (res, data) => {
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
module.exports.responseCustomError = (res, error) => {
  res.status(400).json({
    error: {
      code: error.code,
      message: error.message
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
module.exports.responseUnauthorized = (res, message) => {
  res.status(401).json({
    error: {
      message: 'Unauthorized'
    }
  })
}